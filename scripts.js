window.addEventListener('DOMContentLoaded', function () {
  async function buscaDados() {
    try {
      let consulta = await fetch("https://projeto-ponto-coleta.herokuapp.com/pontodecoleta/");
      let dados = await consulta.json();

      const htmlItemLista = (dados) => {
        function verificaTipoLixo() {
          if (dados.tipo == 'O') {
            return ['Lixo orgânico', '#16a085', 'images/O.jpg']
          } else if (dados.tipo == 'D') {
            return ['Lixo doméstico', '#2c3e50', 'images/D.jpg']
          } else if (dados.tipo == 'C') {
            return ['Lixo comercial', '#2980b9', 'images/C.jpg']
          } else if (dados.tipo == 'H') {
            return ['Lixo hospitalar', '#e74c3c', 'images/H.jpg']
          } else if (dados.tipo == 'E') {
            return ['Lixo eletrônico', '#7f8c8d', 'images/E.jpg']
          } else {
            return ['Lixo radioativo', '#f39c12', 'images/R.webp']
          }
        }
    
        const [lixoTipo, cor, img] = verificaTipoLixo(dados.tipo)

        return `<li>
          <div class="item_lista">
            <div class="item_img">
              <img src="${img}" alt="">     
            </div>
            <div class="item_info">
                <div class="texto">Adm: ${dados.responsavel}</div>
                <div class="texto">Endereço: ${dados.cidade} - SP - Bairro: ${dados.bairro} - Rua: ${dados.rua}, ${dados.numero}</div>
                <div class="texto" style="background:${cor}">${lixoTipo}</div>
            </div>
          </div>
        </li> 
        `;  
      }
    
    
      const ul = document.querySelector('.box_lista ul')
  
      dados.forEach(element => {
        ul.innerHTML += htmlItemLista(element)
      });


    } catch (erro) {
      console.log(`Erro >>>>>>> ${erro}`);
    }
  }
  
  buscaDados()
  
})