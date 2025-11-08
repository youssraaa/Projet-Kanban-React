import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const TASKS_URL = 'http://localhost:3001/tasks'

const schema = Yup.object({
  title: Yup.string().required('Titre obligatoire').min(3, 'Au moins 3 caractères'),
  description: Yup.string().max(200, '200 caractères max'),
  status: Yup.string().oneOf(['todo', 'doing', 'done']).required(),
})

function NewTask() {
  const navigate = useNavigate()

  return (
     <div className="main-container">
      <h2 className="page-title">Nouvelle tâche</h2>

      <Formik
        initialValues={{ title: '', description: '', status: 'todo' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const now = new Date()
            const newTask = {
            title: values.title,
            description: values.description,
            status: values.status,
            createdAt: now.toLocaleDateString('fr-FR'),
          }
           const response = await fetch(TASKS_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newTask),
            })

            if (!response.ok) {
              throw new Error('Erreur lors de la création de la tâche')
            }

            resetForm()
            navigate('/') // on retourne vers le tableau
          } catch (err) {
            console.error(err)
            alert("Erreur lors de la création de la tâche")
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

            <button type="submit" className="btn btn-primary">
              Créer
            </button>
          </Form>
      </Formik>
    </div>
  )
}

export default NewTask
