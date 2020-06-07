const PodcastCategoria = require('../models/PodcastCategoria');
const Usuario = require('../models/User');
const Comentario = require('../models/Comentario');
const Categoria = require('../models/Categoria');
const Publicidade = require('../models/Publicidade');
const View = require('../models/View');
const Assinatura = require('../models/Assinatura');
const PodCast = require('../models/PodCast');
const path = require('path');

const pdf = require('html-pdf');



function generateHTML(data){
    return `
        Quantidade de podcasts : ${data.qtd_podcast} <br> <br>
        Quantidade de Usuarios : ${data.qtd_usuario} <br> <br> 
        Quantidade de Moderadores : ${data.qtd_moderador} <br> <br>
        Quantidade de Categorias : ${data.qtd_categoria} <br> <br>
        Quantidade de Podcasters : ${data.qtd_podcaster} <br> <br>
        Quantidade de Comentarios :  ${data.qtd_comentario} <br> <br>
        Quantidade de Premium :  ${data.qtd_premium} <br> <br>
        Quantidade de Publicidades : ${data.qtd_publicidade} <br> <br>
        Total de Visualizações : ${data.total_view} <br> <br>
        Visualizações na Semana : ${data.week_view} <br> <br>
        Visualizações do mês: ${data.month_view} <br> <br>
        Total de assinaturas : ${data.ass_qtd_total_total} <br> <br>
        Total de assinaturas Mensal: ${data.ass_qtd_anual_mensal} <br> <br>
        Total assinaturas Anual : ${data.ass_qtd_total_anual} <br> <br>
        Quantidade mensal total: ${data.ass_qtd_emnsal_total} <br> <br>
        Quantidade mensal do mes: ${data.ass_qtd_mensal_mensal} <br> <br>
        Quantidade de assinaturas anual do mes: ${data.ass_qtd_mensal_anual} <br> <br>
        ass_qtd_anual_total : ${data.ass_anual_total}  <br> <br>
        ass_qtd_anual_mensal : ${data.ass_qtd_anual_mensal}  <br> <br>
        ass_qtd_anual_anual: ${data.ass_qtd_anual_anual}  <br> <br>
        ass_valor_total_total: ${data.ass_valor_total_total}  <br> <br>
        ass_valor_total_total: ${data.ass_valor_total_total}  <br> <br>
        ass_valor_total_anual: ${data.ass_valor_total_anual}  <br> <br>
        ass_valor_total_mensal: ${data.ass_valor_total_mensal}  <br> <br>
        ass_valor_mensal_total: ${data.ass_valor_mensal_total}  <br> <br>
        ass_valor_mensal_mensal: ${data.ass_valor_mensal_mensal} <br> <br>
        ass_valor_mensal_anual:  ${data.ass_valor_mensal_anual}  <br> <br>
        ass_valor_anual_total: ${data.ass_valor_anual_total}  <br> <br>
        ass_valor_anual_mensal: ${data.ass_valor_anual_mensal}  <br> <br>
        ass_valor_anual_anual: ${data.ass_valor_anual_anual}  <br> <br>
    `
}

module.exports = {
	async index(req, res) {


        const qtd_podcast = await PodcastCategoria.findAllPodcast();
		const qtd_solicitacao = await PodCast.findPodcastSolicitacoes();
		const qtd_usuario = await Usuario.findCountAllUsers();
		const qtd_moderador = await Usuario.findAllMod();
		const qtd_categoria = await Categoria.buscaTodos();
		const qtd_comentario = await Comentario.findAllComments();
		const qtd_podcaster = await Usuario.findAllPodcaster();
		const qtd_publicidade = await Publicidade.findAll();
		const qtd_premium = await Usuario.findAllPodcasterPremium();
		const total_view = await View.countViewAll(1);
		const week_view = await View.countViewLastWeek(1);
		const month_view = await View.countViewLastMonth(1);
		const ass_total_total = await Assinatura.countTotalAll();
		const ass_total_mensal = await Assinatura.countTotalMensal();
		const ass_total_anual = await Assinatura.countTotalAnual();
		const ass_mensal_total = await Assinatura.countMensalAll();
		const ass_mensal_mensal = await Assinatura.countMensalMensal();
		const ass_mensal_anual = await Assinatura.countMensalAnual();
		const ass_anual_total = await Assinatura.countAnualAll();
		const ass_anual_mensal = await Assinatura.countAnualMensal();
		const ass_anual_anual = await Assinatura.countAnualAnual();

        
        const data = {
            qtd_podcast: qtd_podcast.length,
			qtd_solicitacao: qtd_solicitacao.length,
			qtd_usuario: qtd_usuario.length,
			qtd_moderador: qtd_moderador.length,
			qtd_categoria: qtd_categoria.length,
			qtd_podcaster: qtd_podcaster.length,
			qtd_comentario: qtd_comentario.length,
			qtd_premium: qtd_premium.length,
			qtd_publicidade: qtd_publicidade.length,
			totalview: total_view.qtd_viewtotal,
			viewweek: week_view.qtd_viewweek,
			viewmonth: month_view.qtd_viewmonth,
			ass_qtd_total_total: ass_total_total.qtd_total,
			ass_qtd_total_mensal: ass_total_mensal.qtd_mensal,
			ass_qtd_total_anual: ass_total_anual.qtd_anual,
			ass_qtd_mensal_total: ass_mensal_total.qtd,
			ass_qtd_mensal_mensal: ass_mensal_mensal.qtd,
			ass_qtd_mensal_anual: ass_mensal_anual.qtd,
			ass_qtd_anual_total: ass_anual_total.qtd,
			ass_qtd_anual_mensal: ass_anual_mensal.qtd,
			ass_qtd_anual_anual: ass_anual_anual.qtd,
			ass_valor_total_total: ass_total_total.valor_total ? ass_total_total.valor_total : 0 ,
			ass_valor_total_anual: ass_total_anual.valor_anual ? ass_total_anual.valor_anual : 0,
			ass_valor_total_mensal: ass_total_mensal.valor_mensal ? ass_total_mensal.valor_mensal : 0,
			ass_valor_mensal_total: ass_mensal_total.valor ? ass_mensal_total.valor : 0,
			ass_valor_mensal_mensal: ass_mensal_mensal.valor ? ass_mensal_mensal.valor : 0,
			ass_valor_mensal_anual: ass_mensal_anual.valor ? ass_mensal_anual.valor : 0,
			ass_valor_anual_total: ass_anual_total.valor ? ass_anual_total.valor : 0,
			ass_valor_anual_mensal: ass_anual_mensal.valor ? ass_anual_mensal.valor : 0,
			ass_valor_anual_anual: ass_anual_anual.valor ? ass_anual_anual.valor : 0,
        }

        const date = new Date(Date.now());

        const filename = `relatorio-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-${Date.now()}.pdf`;

        pdf.create(generateHTML(data),{}).toFile(path.resolve(__dirname, '../', "../", 'tmp', 'pdfs', filename), (err, resp) => {
            if(err){
                console.log("Erro")
            }else{
                console.log(resp)
            }
        })
        
        return res.json(`/filepdf/${filename}`)
        
	},

	
};
