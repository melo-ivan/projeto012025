// JS: máscaras simples e validação adicional
document.addEventListener('DOMContentLoaded',function(){
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('cadForm');
  const msg = document.getElementById('formMsg');

  function setCursorPos(el, pos) { try{ el.setSelectionRange(pos,pos); }catch(e){} }

  function mask(o, f){
    o.addEventListener('input', function(e){
      this.value = f(this.value);
    }, false);
  }

  function cpfMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,'$1.$2.$3-$4');
    return v;
  }

  function telMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/^(\d{2})(\d)/,'($1) $2');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  }

  function cepMask(v){
    v = v.replace(/\D/g,'').slice(0,8);
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  }

  if(cpf) mask(cpf, cpfMask);
  if(tel) mask(tel, telMask);
  if(cep) mask(cep, cepMask);

  // Exemplo simples: preencher endereço via CEP (simulação)
  if(cep){
    cep.addEventListener('blur', function(){
      const v = this.value.replace(/\D/g,'');
      if(v.length===8){
        // Simula preenchimento (não faz request externo)
        document.getElementById('endereco').value = "Rua Exemplo, 123";
        document.getElementById('cidade').value = "Cidade Exemplo";
        document.getElementById('estado').value = "SP";
      }
    });
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        msg.textContent = "Corrija os campos em destaque.";
        msg.style.color = "crimson";
        return;
      }
      // Simula envio
      msg.textContent = "Cadastro enviado com sucesso. Obrigado!";
      msg.style.color = "green";
      form.reset();
    });
  }
});
