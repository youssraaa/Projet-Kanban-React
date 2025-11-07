import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const schema = Yup.object({
  title: Yup.string().required('Titre obligatoire').min(3, 'Au moins 3 caractères'),
  description: Yup.string().max(200, '200 caractères max'),
  status: Yup.string().oneOf(['todo', 'doing', 'done']).required(),
})

function NewTask() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h2 className="mb-3">Nouvelle tâche</h2>

      <Formik
        initialValues={{ title: '', description: '', status: 'todo' }}
        validationSchema={schema}
        onSubmit={(values) => {
          const newTask = {
            id: Date.now(), // sert juste d'identifiant unique pour éviter le doublon (StrictMode)
            title: values.title,
            description: values.description,
            status: values.status,
          }
          navigate('/', { state: { newTask } })
        }}
      >
          <Form>
            <div className="mb-3">
              <label className="form-label">Titre</label>
              <Field name="title" className="form-control" />
              <div className="text-danger"><ErrorMessage name="title" /></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <Field as="textarea" name="description" className="form-control" rows="3" />
              <div className="text-danger"><ErrorMessage name="description" /></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Statut</label>
              <Field as="select" name="status" className="form-select">
                <option value="todo">À faire</option>
                <option value="doing">En cours</option>
                <option value="done">Terminé</option>
              </Field>
              <div className="text-danger"><ErrorMessage name="status" /></div>
            </div>

            <button type="submit" className="btn btn-primary">
              Créer
            </button>
          </Form>
      </Formik>
    </div>
  )
}

export default NewTask
