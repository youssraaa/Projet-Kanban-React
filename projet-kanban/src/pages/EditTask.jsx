import { useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const TASKS_URL = 'http://localhost:3001/tasks'

const schema = Yup.object({
  title: Yup.string()
    .required('Le titre est obligatoire')
    .min(3, 'Au moins 3 caractères'),
  description: Yup.string()
    .max(200, '200 caractères maximum'),
  status: Yup.string()
    .oneOf(['todo', 'doing', 'done'])
    .required('Le statut est obligatoire'),
})

function EditTask() {
  const navigate = useNavigate()
  const location = useLocation()
  const taskToEdit = location.state?.task

   if (!taskToEdit) {
    return <p className="m-3 text-danger">Tâche introuvable.</p>
  }

  return (
    <div className="container">
      <h2 className="mb-3">Modifier la tâche</h2>

      <Formik
        initialValues={{
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,   
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const updatedTask = {
              id: taskToEdit.id,
              title: values.title,
              description: values.description,
              status: values.status,
              createdAt: taskToEdit.createdAt,
            }

            const response = await fetch(`${TASKS_URL}/${taskToEdit.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedTask),
            })

            if (!response.ok) {
              throw new Error('Erreur lors de la mise à jour de la tâche')
            }

            navigate('/') 
          } catch (err) {
            console.error(err)
            alert('Erreur lors de la mise à jour de la tâche')
          } finally {
            setSubmitting(false)
          }
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

          <button type="submit" className="btn btn-primary">Mettre à jour</button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditTask
