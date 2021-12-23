import React, { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
import SkeletonLoaderComponent from './skeletonLoader'
import AlertMessageComponent from './alertMessage'
//functions
import { TakeofTypenameFromReturnQuery } from '../functions'
//var
import { HEADER_TABLE_CLOTHES, ERROR } from '../constant/var'
//hooks
import {
  useQueryGraphQL,
  useMutationGraphQL,
  useErrorMessage,
  useLoading
} from '../hooks'
//graphql
import { GET_CLOTHES, CREATE_CLOTHES, DELETE_CLOTHES } from '../graphql'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'
import ConfigDataContext from '../store/configData/configDataContext'

const CollageComponent = () => {
  // const [clothes, setClothes] = useState([])
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })
  const [createLoading, toggleCreateLoading] = useLoading(false)
  const [idClothes, setidClothes] = useState(null)

  const { showAlert, showGlobalAlert, cleanGlobalAlert } = useContext(GlobalAlertContext)
  const { clothes, setConfigData } = useContext(ConfigDataContext)

  //-------- GRAPHQL
  const { data: clothesData, error: ErrorGetClothes, loading } = useQueryGraphQL(GET_CLOTHES)

  const [createClothes] = useMutationGraphQL(CREATE_CLOTHES, {
    refetchQueries: [{ query: GET_CLOTHES }]
  })

  const [deleteClothes] = useMutationGraphQL(DELETE_CLOTHES, {
    refetchQueries: [{ query: GET_CLOTHES }]
  })
  //---------

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Debe ingresar una prenda")
    }),
    onSubmit: async (values, { resetForm }) => {
      const { name } = values

      try {

        toggleCreateLoading(true)

        await createClothes({
          variables: {
            input: {
              name
            }
          }
        })

        toggleCreateLoading(false)
        showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Prenda creada con éxito' })

        resetForm({ values: '' })

      } catch (error) {
        createMessage({ message: error.message })
        toggleCreateLoading(false)
        console.log(error)
      }
    }
  })

  const handleDeleteClothes = async (id) => {
    try {

      setidClothes(id)

      await deleteClothes({
        variables: {
          id
        }
      })

      showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Prenda eliminada con éxito' })

    } catch (error) {
      setidClothes(null)
      createMessage({ message: error.message })
      console.log(error)
    }
  }

  //-------- USEEFFECT
  useEffect(() => {
    if (clothesData?.getAllClothes) {
      setConfigData(clothesData.getAllClothes, "clothes")
      setidClothes(null)
      return
    }
    if (!!ErrorGetClothes) {
      createMessage({ message: ErrorGetClothes.message })
      return
    }
  }, [clothesData, ErrorGetClothes])

  useEffect(() => {
    if (errorMessage.show) {
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }
  }, [errorMessage.show])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        cleanGlobalAlert()
      }, 1800);
    }
  }, [showAlert])
  //--------

  if (loading) {
    return (
      <div className="w-full">
        <SkeletonLoaderComponent />
      </div>
    )
  }

  return (
    <div className="bg-white mx-4 p-4 rounded-md sm:mt-2 md:mt-0">
      {errorMessage.show &&
        <div>
          <AlertMessageComponent
            title={ERROR}
            description={errorMessage.message}
          />
        </div>
      }
      <div className="w-full flex justify-center pb-4">
        <p className="font-semibold uppercase text-md">Prendas</p>
      </div>
      {formik.touched.name && formik.errors.name &&
        <div className="mb-2">
          <AlertMessageComponent
            title={ERROR}
            description={formik.errors.name}
          />
        </div>
      }
      <div className="sm:w-full lg:flex lg:items-center">
        <div className="sm:w-full lg:w-2/3 lg:flex lg:pr-2">
          <InputComponent
            id="input_clothes_admin"
            name="name"
            placeholder="Ingrese una Prenda"
            width="full"
            height="9"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="sm:w-full sm:pt-4 lg:w-1/3 lg:pt-0">
          <ButtonComponent
            color={createLoading ? "gray" : "green"}
            text={createLoading ? "Ingresando..." : "Agregar"}
            disabled={createLoading ? true : false}
            icon={createLoading ? "loading" : ""}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
      <TableComponent
        headers={HEADER_TABLE_CLOTHES}
        data={TakeofTypenameFromReturnQuery(clothes)}
        onDeleteClick={(id) => handleDeleteClothes(id) }
        idItem={idClothes}
      />
    </div>
  )
}

export default CollageComponent
