import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './componets/Card';
import Input from './componets/Input';
import { getCoumtries } from "./service/paises"
import { getCity } from "./service/cidades"
import Swal from 'sweetalert2'
import MultiSelect from './componets/MultiSelect';

function App() {
  const [form, setForm] = useState(
    {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
    }
  )

  const [paises, setPaises] = useState([])
  const [cidades, setCidades] = useState([])

  useEffect(() => {
    async function fatData(){
    const paisesData = await getCoumtries()
    const cidadesData = await getCity()

    setPaises(paisesData.map(paises =>{
      return {
        value: paises.code,
        label: paises.name_ptbr
      }
    }))

    setCidades(cidadesData.map(cidades => {
      return {
        value: cidades.code,
        label: cidades.name_ptbr
      }
    }))}
  
   fatData()
    
  }, []);
  
  useEffect(() => {
    if (form.cpf.length === 14) {
      if (!isCpf(form.cpf)) setTimeout(
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'CPF inválido, tente novamente.',
        }), 1)
    }
  }, [form]);

  function mask(numeroTelefone) {
    return modify(numeroTelefone)
  }

  function handleChange(event) {
    let { name, value } = event.target;
    value = name === "telefone" ? mask(value) : value
    value = name === "cpf" ? cpfMask(value) : value

    setForm({
      ...form,
      [name]: value
    })
  }


  function modify(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  function isCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
        soma += parseInt(e) * ((j + 2) - (i + 1));
      });
      r = soma % 11;
      r = (r < 2) ? 0 : 11 - r;
      if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
  }

  return (

    <div>

      <h1 className='align'>Marque seus destinos de interrese</h1>

      <div className="App">
        <Card titulo="Dados Pessoais">
          <Input handleChange={handleChange} value={form.nome} name="nome" inputName="Nome Completo: " placeholder="EX: João Silva Santos"></Input>
          <Input handleChange={handleChange} value={form.email} name="email" type="email" inputName="E-mail: " placeholder="EX: João@hotmail.com"></Input>
          <Input handleChange={handleChange} value={form.telefone} name="telefone" maxLength="15" inputName="Telefone: " placeholder=" EX: (99)99999-9999"></Input>
          <Input handleChange={handleChange} value={form.cpf} name="cpf" inputName="CPF: " placeholder="EX: 000.000.000-00"></Input>
        </Card>

        <Card titulo="Destinos de Interrese">
          <MultiSelect name="Países: " options={paises}></MultiSelect>
          <MultiSelect name="Cidades: " options={cidades}></MultiSelect>
        </Card>  
      </div>

      <div className='align'>
        <button className='btn'>Enviar</button>
      </div>
    </div>
  );
}

export default App;
