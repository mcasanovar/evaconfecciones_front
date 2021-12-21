import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
import SkeletonLoaderComponent from './skeletonLoader'
import AlertMessageComponent from './alertMessage'
//var
import { ERROR, HEADER_TABLE_COLLAGES } from '../constant/var'
//functions
import { TakeofTypenameFromReturnQuery } from '../functions'
//graphql
import { GET_COLLAGES, CREATE_COLLAGE } from '../graphql'
//hooks
import { 
  useQueryGraphQL, 
  useMutationGraphQL,
  useErrorMessage 
} from '../hooks'

const CollageComponent = () => {
  const [collages, setCollages] = useState([])
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({show: false, message: ''})
  const [loadingMutation, setLoadingMutation] = useState(false)

  const { data: collagesData, error: ErrorGetCollages, loading } = useQueryGraphQL(GET_COLLAGES)

  const [createCollage] = useMutationGraphQL(CREATE_COLLAGE, {
    refetchQueries: [{ query: GET_COLLAGES }]
  })

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Debe ingresar el colegio")
    }),
    onSubmit: async (values, { resetForm }) => {
      const { name } = values

      try {

        setLoadingMutation(true)

        await createCollage({
          variables: {
            input: {
              name
            }
          }
        })

        setLoadingMutation(false)

        resetForm({ values: '' })

      } catch (error) {
        console.log(error)
      }
    }
  })

  //--------------------------------------------------USEEFFECTS
  useEffect(() => {
    if (collagesData?.getAllCollages) {
      setCollages(collagesData.getAllCollages)
      return
    }
    if (!!ErrorGetCollages) {
      createMessage({ show: true, message: ErrorGetCollages.message })
      return
    }
  }, [collagesData, ErrorGetCollages])

  useEffect(() => {
    if(errorMessage.show){
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }
  }, [errorMessage.show])

  //----------------------------------------------------
    if (loading) {
      return (
        <div className="w-full">
          <SkeletonLoaderComponent />
        </div>
      )
    }

  return (
    <div className="bg-white mx-4 p-4 rounded-md">
      {errorMessage.show &&
        <div>
          <AlertMessageComponent
            title={ERROR}
            description={errorMessage.message}
          />
        </div>
      }
      <div className="w-full flex justify-center pb-4">
        <p className="font-semibold uppercase text-md">Colegios</p>
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
            id="input_collage_admin"
            name="name"
            placeholder="Nombre del colegio"
            width="full"
            height="9"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="sm:w-full sm:pt-4 lg:w-1/3 lg:pt-0">
          <ButtonComponent
            color={loadingMutation ? "gray": "green"}
            text={loadingMutation ? "Ingresando..." : "Agregar"}
            disabled={loadingMutation ? true : false}
            icon={loadingMutation ? "loading": "" }
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
      <TableComponent
        headers={HEADER_TABLE_COLLAGES}
        data={TakeofTypenameFromReturnQuery(collages)}
        onClick={(id) => alert(id) }
      />
    </div>
  )
}

export default CollageComponent
