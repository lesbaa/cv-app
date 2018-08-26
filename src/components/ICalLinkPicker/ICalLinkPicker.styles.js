import css from 'styled-jsx/css'

export default css`
.ICalLinkPicker, .ICalLinkPicker > * {
  text-align: center;
  background-blend-mode: color-burn;
  mix-blend-mode: color-burn;
}

.input {
  background: none;
  box-sizing: border-box;
  border: 1px solid #444;
  display: inline-block;
  width: 100%;
  padding: 0.25em;
  margin: 0;
  font-size: 1.2em;
}

.error {
  border: 1px solid #744;
}

.submit {
  display: block;
  border-radius: 0.25em;
  color: #eee;
  background-color: #444;
  margin: 1em 0;
  padding: 1em;
  text-align: center;
}
`
