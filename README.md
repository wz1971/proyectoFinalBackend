# Proyecto Final Backend

## PreEntrega2

### Detalle

- Método GET en api/products, en / y en /products recibe y procesa:
  - limit (default 10) **OK**
  - sort (asc y desc - default asc) **OK**
  - page (default 1) **OK**
  - query (formato {"campo":"valor"}) **OK**
  - los items de query params se pueden combinar **OK**
- GET Devuelve formato requerido (status, payload, etc.) **OK**
- Método DELETE api/carts/:cid/products/:pid **OK**
- Método PUT api/carts/:cid --> **OK**
- Método PUT api/carts/:cid/products/:pid **OK**
- Método DELETE api/carts/:cid elimina todos los productos **OK**
- Uso de Populate **OK**
- Vista /products --> *Sólo falta darle funcionalidad al botón de Add To Cart*
- Vista /carts/:cid --> *Sólo falta darle funcionalidad al botón de Remove*
