
      var formElement=null;
      var respuestaText=null;
      var respuestaText2=null;
      var respuestaSelect=null;
      var respuestaSelect2=null;
      var respuestaSelectMulti=null;
      var respuestasCheckbox = [];
      var respuestasCheckbox2 = [];
      var respuestasRadio = [];
      var respuestasRadio2 = [];
      var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)


      //**************************************************************************************************** 
      //Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
        window.onload = function(){ 
      
      //CORREGIR al apretar el botón
      formElement=document.getElementById('myForm');
      formElement.onsubmit=function(){
      
      inicializar();
      if (comprobar()){
      corregirCheckbox();
      corregirText();
      corregirRadio();
      corregirSelect();
      corregirCheckbox2();
      corregirText2();
      corregirRadio2();
      corregirSelect2();
     
      presentarNota();
      alert('seguro quieres enviar');
      }
      return false;
      
      }
       var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      gestionarXml(this);
      }
      };
      xhttp.open("GET", "https://rawgit.com/oldmoo/autocorrecion/master/xml/questions.xml", true);
      xhttp.send();
     }

      //****************************************************************************************************
      // Recuperamos los datos del fichero XML xml/preguntas.xml
      // xmlDOC es el documento leido XML. 

      function gestionarXml (datosXml) {
         var xmlDoc = datosXml.responseXML; //Parse XML to xmlDoc
         //CHECKBOX
      //Recuperamos el título y las opciones, guardamos las respuestas correctas
      var tituloCheckbox = xmlDoc.getElementsByTagName('title')[0].innerHTML;
      var opcionesCheckbox = [];
      var nopt = xmlDoc.getElementById("CJP001").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesCheckbox[i]=xmlDoc.getElementById("CJP001").getElementsByTagName('option')[i].innerHTML;
      }

      ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
      var nres = xmlDoc.getElementById("CJP001").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasCheckbox[i]= xmlDoc.getElementById("CJP001").getElementsByTagName("answer")[i].innerHTML;
      }

      //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
      var tituloInput=xmlDoc.getElementsByTagName("title")[1].innerHTML;
      ponerDatosInputHtml(tituloInput);
      respuestaText=xmlDoc.getElementById("CJP002").getElementsByTagName("answer")[0].innerHTML;

 

       /* SELECT 1*/
      
      var tituloSelect=xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
      var opcionesSelect = [];
      var nopt = xmlDoc.getElementById("CJP003").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesSelect[i] = xmlDoc.getElementById("CJP003").getElementsByTagName('option')[i].childNodes[0].nodeValue;
      }
      ponerDatosSelectHtml(tituloSelect,opcionesSelect);
      respuestaSelect= parseInt(xmlDoc.getElementById("CJP003").getElementsByTagName("answer")[0].childNodes[0].nodeValue);
      
       /* SELECT MULTIPLE */

      var tituloSelectMultiple=xmlDoc.getElementsByTagName("title")[4].childNodes[0].nodeValue;
      var opcionesSelectMultiple = [];
      var nopt = xmlDoc.getElementById("CJP005").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesSelectMultiple[i] = xmlDoc.getElementById("CJP005").getElementsByTagName('option')[i].childNodes[0].nodeValue;
      }
      ponerDatosSelecMultipletHtml(tituloSelectMultiple,opcionesSelectMultiple);
      respuestaSelectMulti= xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue;

       /* checkbox 2  */
      
      var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
      var opcionesCheckbox2 = [];
      var nopt = xmlDoc.getElementById("CJP008").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesCheckbox2[i]=xmlDoc.getElementById("CJP008").getElementsByTagName('option')[i].innerHTML;
      }  
      ponerDatosCheckbox2Html(tituloCheckbox2,opcionesCheckbox2);
      var nres = xmlDoc.getElementById("CJP008").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasCheckbox2[i]=xmlDoc.getElementById("CJP008").getElementsByTagName("answer")[i].innerHTML;
      }

       /* input 2 */
      var tituloInput2=xmlDoc.getElementsByTagName("title")[8].innerHTML;
      ponerDatosInputHtml2(tituloInput2);
      respuestaText2= xmlDoc.getElementById("CJP011").getElementsByTagName("answer")[0].innerHTML;

      /* SELECT 2 */
      var tituloSelect2=xmlDoc.getElementsByTagName("title")[6].childNodes[0].nodeValue;
      var opcionesSelect2 = [];
      var nopt = xmlDoc.getElementById("CJP007").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesSelect2[i] = xmlDoc.getElementById("CJP007").getElementsByTagName('option')[i].childNodes[0].nodeValue;
      }
      ponerDatosSelectHtml2(tituloSelect2,opcionesSelect2);
      respuestaSelect2= xmlDoc.getElementById("CJP007").getElementsByTagName("answer")[0].childNodes[0].nodeValue;

       /* SELECT MULTIPLE 2 */
      
      var tituloSelectMultiple2=xmlDoc.getElementsByTagName("title")[10].childNodes[0].nodeValue;
      var opcionesSelectMultiple2 = [];
      var nopt = xmlDoc.getElementById("CJP010").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesSelectMultiple2[i] = xmlDoc.getElementById("CJP010").getElementsByTagName('option')[i].childNodes[0].nodeValue;
      }
      ponerDatosSelecMultipletHtml2(tituloSelectMultiple2,opcionesSelectMultiple2);
      respuestaSelectMulti= xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue;

       /* RADIO */
      var tituloRadio = xmlDoc.getElementsByTagName("title")[3].innerHTML;
      var opcionesRadio = [];
      var nopt = xmlDoc.getElementById("CJP004").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesRadio[i]=xmlDoc.getElementById("CJP004").getElementsByTagName('option')[i].innerHTML;
      }
      ponerDatosRadioHtml(tituloRadio,opcionesRadio);
      var nres = xmlDoc.getElementById("CJP004").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasRadio[i]=xmlDoc.getElementById("CJP004").getElementsByTagName("answer")[i].innerHTML;
      }
      
        /* RADIO 2 */
      
      var tituloRadio2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
      var opcionesRadio2 = [];
      var nopt = xmlDoc.getElementById("CJP006").getElementsByTagName('option').length;
      for (i = 0; i < nopt; i++) { 
      opcionesRadio2[i]=xmlDoc.getElementById("CJP006").getElementsByTagName('option')[i].innerHTML;
      }
      ponerDatosRadioHtml2(tituloRadio2,opcionesRadio2);
      var nres = xmlDoc.getElementById("CJP006").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasRadio2[i]=xmlDoc.getElementById("CJP006").getElementsByTagName("answer")[i].innerHTML;
      }

      }
    
        
   

      //****************************************************************************************************************
      /* IMPLEMENTACIÓN CORRECION */
      
      function corregirCheckbox(){
      var f=document.getElementById('myForm');
      var escorrecta = [];
      for (i = 0; i < f.rp.length; i++) {
      if (f.rp[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox.length; j++) {
      if (i==respuestasCheckbox[j]) 
       escorrecta[i]=true;

      }
      } 
      }
      for (i = 0; i < f.rp.length; i++) {   
      if (f.rp[i].checked) {
      if (escorrecta[i]) {
      nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P1:  CORRECTA");    
      } else {
      nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P1:  INCORRECTA (LA RESPUESTA CORRECTA ES FRAMEWORK DE JAVASCRIPT PARA APLICACIONES SPA)");
      }   
      }
      }
      }

       function corregirCheckbox2(){
      var f=document.getElementById('myForm');
      var escorrecta = [];
      for (i = 0; i < f.salary.length; i++) {
      if (f.salary[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox2.length; j++) {
      if (i==respuestasCheckbox2[j]) 
       escorrecta[i]=true;

      }
      } 
      }
      for (i = 0; i < f.salary.length; i++) {   
      if (f.salary[i].checked) {
      if (escorrecta[i]) {
      nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P6:  CORRECTA");    
      } else {
      nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P6:  INCORRECTA (LA RESPUESTA CORRECTA ES 1500€)");
      }   
      }
      }
      }
       
     function corregirText(in1,in2){
       var s=document.getElementById("texto").value;
        in1=s.toUpperCase();
        in2=respuestaText.toUpperCase();
       
       if(in1==in2){
       
       
       darRespuestaHtml("P2: CORRECTA");
       
       nota +=1;
       }
       else {
       
       darRespuestaHtml("P2: INCORRECTA, LA RESPUESTA CORRECTA ES (CONECTIVIDAD DE BASE DE DATOS JAVA)");
       }
       }



      function corregirText2(){
       var s=document.getElementById("texto2").value;
       var mayus=s.toUpperCase();
       var mayus2=respuestaText2.toUpperCase();
       
       if(mayus==mayus2){
       
       
       darRespuestaHtml("P7: CORRECTA");
       
       nota +=1;
       }
       else {
       
       darRespuestaHtml("P7: INCORRECTA, LA RESPUESTA CORRECTA ES (PROGRAMACIÓN ORIENTADO A OBJETO)");
       }
       }
       

        function corregirSelect2(){
      //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
      //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
      //luego comparar ese value con el value guardado en answer
     //formElement.elements[2];  
      var sele = document.getElementById("sel2");

      if (sele.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
      darRespuestaHtml("P9: CORRECTA");
      nota +=1;
      }
      else darRespuestaHtml("P9: INCORRECTA LA RESPUESTA CORRECTA ES (SOFTWARE QUE PERMITE EJECUTAR PROGRAMA JAVA)");

      }
      

        function corregirSelect(){
      //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
      //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
      //luego comparar ese value con el value guardado en answer
     //formElement.elements[2];  
      var sele = document.getElementById("sel");

      if (sele.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
      darRespuestaHtml("P4: CORRECTA");
      nota +=1;
      }
      else darRespuestaHtml("P4: INCORRECTA LA RESPUESTA CORRECTA ES (SUN MICROSYSTEMS)");
      }

      function corregirRadio(){
      //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
      var f=formElement;
      var escorrecta = [];
      for (i = 0; i < f.year.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.year[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasRadio.length; j++) {
      if (i==respuestasRadio[j]) escorrecta[i]=true;
      }
      //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
      if (escorrecta[i]) {
      nota +=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P3: CORRECTA");    
      } else {
      nota -=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P3: INCORRECTA, LA RESPUESTA CORRECTA ES (1995)");
      }   
      } 
      }
      }

         function corregirRadio2(){
      //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
      var f=formElement;
      var escorrecta = [];
      for (i = 0; i < f.soft.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.soft[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasRadio2.length; j++) {
      if (i==respuestasRadio2[j]) escorrecta[i]=true;
      }
      //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
      if (escorrecta[i]) {
      nota +=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P8: CORRECTA");    
      } else {
      nota -=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P8: INCORRECTA, LA RESPUESTA CORRECTA ES (APPLE)");
      }   
      } 
      }
      }



      

      





//*************************************************************************************************************
      // PONER LOS DATOS EN EL HTML 

      function ponerDatosCheckboxHtml(t,opt){
      var checkboxContainer=document.getElementById('checkboxDiv');
      var h3 = document.createElement("h3");
      h3.innerHTML = t;
      checkboxContainer.appendChild(h3); 
      for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "rp_"+i);
      input.type="checkbox";
      input.name="rp";
      input.id="rp"+i;    
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      }  
      }

       function ponerDatosInputHtml(t){
      document.getElementById("tituloInput").innerHTML = t;
      }



       function ponerDatosSelectHtml(t,opt){
      document.getElementById("tituloSelect").innerHTML=t;
      var select = document.getElementsByTagName("select")[0];
      for (i = 0; i < opt.length; i++) { 
      var option = document.createElement("option");
      option.text = opt[i];
      option.value=i+1;
      select.options.add(option);
      }  
      }

      function ponerDatosSelecMultipletHtml(t,opt){
      document.getElementById("tituloSelectMultiple").innerHTML=t;
      var selectMultiple = document.getElementById("selMultiple");
      for (i = 0; i < opt.length; i++) { 
      var option2 = document.createElement("option");
      option2.text = opt[i];
      option2.value=i+1;
      selectMultiple.options.add(option2);
      }  
      }

      function ponerDatosCheckbox2Html(t,opt){
      var checkboxContainer2=document.getElementById('checkboxDiv2');
      var h3 = document.createElement("h3");
  
      h3.innerHTML = t;
      checkboxContainer2.appendChild(h3); 
      for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "salary_"+i);
      input.type="checkbox";
      input.name="salary";
      input.id="salary_"+i;;    
      checkboxContainer2.appendChild(input);
      checkboxContainer2.appendChild(label);
      
      }  
      }

      function ponerDatosInputHtml2(t){
      document.getElementById("tituloInput2").innerHTML = t;
      }

      function ponerDatosSelectHtml2(t,opt){
      document.getElementById("tituloSelect2").innerHTML=t;
      var select2 = document.getElementById("sel2");
      for (i = 0; i < opt.length; i++) { 
      var option3 = document.createElement("option");
      option3.text = opt[i];
      option3.value=i+1;
      select2.options.add(option3);
      }  
      }
      
      function ponerDatosSelecMultipletHtml2(t,opt){
      document.getElementById("tituloSelectMultiple2").innerHTML=t;
      var selectMultiple2 = document.getElementById("selMultiple2");
      for (i = 0; i < opt.length; i++) { 
      var option3 = document.createElement("option");
      option3.text = opt[i];
      option3.value=i+1;
      selectMultiple2.options.add(option3);
      }  
      }
      function ponerDatosRadioHtml(t,opt) {
      var radioContainer=document.getElementById('radioDiv');
      var h3 = document.createElement("h3");
      h3.innerHTML = t;
      radioContainer.appendChild(h3); 
      for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "year"+i);
      input.type="radio";
      input.name="year";
      input.id="year"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      }
      }


      function ponerDatosRadioHtml2(t,opt) {
      var radioContainer2=document.getElementById('radioDiv2');
      var h3 = document.createElement("h3");
      h3.innerHTML = t;
      radioContainer2.appendChild(h3); 
      for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "soft_"+i);
      input.type="radio";
      input.name="soft";
      input.id="soft"+i;;    
      radioContainer2.appendChild(input);
      radioContainer2.appendChild(label);
      }
      }

        //***************************************************************************************************************
      //Gestionar la presentación de las respuestas
      function darRespuestaHtml(r){
      var p = document.createElement("p");
      var node = document.createTextNode(r);
       p.style.color = '#269900';
      p.appendChild(node);
      document.getElementById('resultadosDiv').appendChild(p);
      }
      
      function presentarNota(){
      darRespuestaHtml("Nota: "+nota+" PUNTOS SOBRE 10");
      }
      
      
      
      
      function inicializar(){
      document.getElementById('resultadosDiv').innerHTML = "";
      nota=0.0;
      }

      
      //****************************************************************************************************************
      /* Comprobar que se han introducido datos en el formulario */
      function comprobar(){
      var f=formElement;
      var checked=false;
      for (i = 0; i < f.rp.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.rp[i].checked) checked=true;
      }
      if (f.elements[0].value=="") {
      f.elements[0].focus();
      alert("Escribe un número");
      return false;
      } else if (f.elements[1].selectedIndex==0) {
      f.elements[1].focus();
      alert("Selecciona una opción");
      return false;
      } if (!checked) {    
      document.getElementsByTagName("h3")[2].focus();
      alert("Selecciona una opción del checkbox");
      return false;
      } else  return true;
      }



      
