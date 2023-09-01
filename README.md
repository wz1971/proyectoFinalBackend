# Proyecto Final Backend

## PreEntrega2

### Detalle

- Método GET en api/products, en / y en /products recibe y procesa:
  - limit (default 10)
  - sort (asc y desc - default asc)
  - page (default 1)
  - query (formato {"campo":"valor"})
  - los items de query params se pueden combinar
- GET Devuelve formato requerido (status, payload, etc.)
- Método DELETE api/carts/:cid/products/:pid --> Pendiente
- Método PUT api/carts/:cid --> Pendiente
- Método PUT api/carts/:cid/products/:pid --> Pendiente
- Método DELETE api/carts/:cid elimina todos los productos
- Uso de Populate --> Pendiente
- Vista /products --> Sólo falta darle funcionalidad al botón de Add To Cart
- Vista /carts/:cid --> Pendiente
