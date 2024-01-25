import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { marked } from 'marked';

marked.setOptions({
  breaks: true,
});

class App extends React.Component {
   constructor(props) {
      super(props);
          this.state = {
      textarea: textoinicial
    };
  }

  handleChange(textarea) {
    this.setState({ textarea });
  }
  
   render() {
      return (
        <div id="cajacero">
          <h1>Previsualizador de Markdown</h1>
          <div id="editorWrapper">
            <textarea id="editor" rows={18} value={this.state.textarea} onChange={(e) => {
                    this.handleChange(e.target.value);
                  }}>
              
            </textarea>
          </div>
          <div id="previewWrapper">
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.textarea) }}>
            </div>
          </div>
        </div>
      )
   }
}

const textoinicial = `# un encabezado (tamaño H1)

## un subencabezado (tamaño H2)

un [enlace](https://www.freecodecamp.org)

código en línea \`<div></div>\`

un bloque de código
\`\`\`
<div></div>
<div></div>
<div></div>
\`\`\`

- un elemento de lista
- otro elemento de lista
- y otro
- estoy desatado

> una cita en bloque

![albertoapedra logo](https://albertoapedra.com/wp-content/uploads/2023/02/albertoapedra-cabecera.png)

**texto en negrita**
`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

export default App;
