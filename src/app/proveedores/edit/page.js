import Form from "@/components/FormProveedores"
import db  from "@/lib/sqlite"
import { editProveedor } from "@/lib/actions"

async function page({searchParams}) {
  const [proveedor] = await db.all('select * from proveedores where id = ?', [ searchParams.id ]);
  console.log(proveedor);

  return (
    <div>
        <h3>Editar proveedor {searchParams.id}</h3>
        <Form action={editProveedor} title='Editar proveedor' proveedor={proveedor} disabled={false}  />
    </div>
  )
}


export default page