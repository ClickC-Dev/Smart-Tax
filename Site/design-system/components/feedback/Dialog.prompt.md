Modal for confirmations and short forms (confirm submission, upload document).

```jsx
<Dialog open={open} title="Enviar declaração?" onClose={close} actions={<><Button variant="ghost" onClick={close}>Cancelar</Button><Button variant="gold">Confirmar</Button></>}>
  Isso enviará sua declaração para revisão do contador.
</Dialog>
```
