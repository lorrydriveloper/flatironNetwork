class HTMLBuilder{


  static errors(messages){
    return `
    <div class="errors">
      <p>${messages}</p>
    </div>
        
    `;
  }

  

}


export default HTMLBuilder