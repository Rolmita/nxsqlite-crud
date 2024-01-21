import Form from "@/components/FormArticulos"
import { newArticulo } from "@/lib/actions"

function page() {
  return (
    <div>
        <h3>Nuevo artículo</h3>
        <Form action={newArticulo} title='Crear artículo' articulo={null} disabled={false}  />
    </div>
  )
}

export default page