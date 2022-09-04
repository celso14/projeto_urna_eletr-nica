//Elementos da tela
let SeuVotoPara = document.querySelector('.d-1-1 span') as HTMLSpanElement;
let cargo = document.querySelector('.d-1-2 span') as HTMLSpanElement;
let numeros = document.querySelector('.d-1-3') as HTMLDivElement;
let descricao = document.querySelector('.d-1-4') as HTMLDivElement;
let aviso = document.querySelector('.d-2') as HTMLDivElement;
let lateral = document.querySelector('.d-1-right') as HTMLDivElement;


//Types
type tipoVoto = {
    etapa : string,
    voto: string
}


//Variaveis globais
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos:tipoVoto[] = [];



//Funções
function iniciarEtapa(){
    const etapa = etapas[etapaAtual]

    let numeroHTML= '';
    numero='';
    votoBranco = false;
    
    for(let i=0; i<(etapa.numeros)-1;i++){
        if(i ===0){
            numeroHTML += '<div class="num pisca"></div>';
        }
        numeroHTML += '<div class="num"></div>';
    }
        

    SeuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}


function atualizaInterface(){
    const etapa = etapas[etapaAtual]
    const candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true;
        }
        else{
            return false;
        }
    });
    if(candidato.length > 0){
        const candidatoEscolhido = candidato[0];
        SeuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidatoEscolhido.nome} <br/>
        Partido: ${candidatoEscolhido.partido}`;

        let fotosHTML = '';
        for(let i in candidatoEscolhido.fotos){
            if(candidatoEscolhido.fotos[i].small){
                fotosHTML += `<div class="d-1-imagem small">
                <img src="images/${candidatoEscolhido.fotos[i].url}" alt="">
                ${candidatoEscolhido.fotos[i].legenda}
                </div>`
            }
            else{
                fotosHTML += `<div class="d-1-imagem">
                <img src="images/${candidatoEscolhido.fotos[i].url}" alt="">
                ${candidatoEscolhido.fotos[i].legenda}
                </div>`
            }

        }

        lateral.innerHTML = fotosHTML;
    }
    else{
        SeuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
}


function clicou(n:string){
    let numeroSelecionado = document.querySelector('.num.pisca');
    if(numeroSelecionado != null){
        numeroSelecionado.innerHTML = n;
        numero = `${numero + n}`

        numeroSelecionado.classList.remove('pisca');
        if(numeroSelecionado.nextElementSibling != null){
            numeroSelecionado.nextElementSibling?.classList.add('pisca');
        }
        else{
            atualizaInterface();
        }
    }
}


function branco(){
    if(numero === ''){
        votoBranco = true;
        SeuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
        lateral.innerHTML = '';
    }
    else{
        alert('PARA VOTAR EM BRANCO NÃO PODE TER DIGITADO NENHUM NÚMERO');
    }
}


function corrige(){
    iniciarEtapa();
}


function confirma(){
    const etapa = etapas[etapaAtual]

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    }
    else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            iniciarEtapa();
        }else{
            const tela = document.querySelector('.tela') as HTMLDivElement;
            tela.innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
            console.log(votos);
        }
    }
}



iniciarEtapa();
