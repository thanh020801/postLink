const mongoose = require('mongoose')

const config = require('../config')
const Document = require('../models/document.model')

const documentController = {

	viewAll: async(req,res)=>{
		try{
			const documents =await Document.find()
			console.log('viewAll')
			if(!documents){
				return res.status(404).json("Không tìm thấy sản phẩm nào !!!")
			}
			return res.status(200).json(documents)		
		}catch(err){
			console.log('loi ơ viewAll')
			return res.status(500).json(err)
		}
	},

	updateDocument: async(req,res)=>{
		try{
			const product = await Product.findOne({id: req.params})
			if(!product){
				return res.status(404).json("Sản phẩm không tồn tại !!!")
			}
			return res.status(200).json(product)			
		}catch(err){
			return res.status(500).json(err)
		}
	},


	addLink: async(req,res)=>{
		try{
			console.log('query', req.query.link)
			console.log('helo', req.params.link)
			const newDocument = Document({
				// "title": req.body.title,
				// "content": req.body.content,
				// "code": req.body.code,
				link: req.query.link
			})
			console.log('newDocument: ', newDocument)
			const nDoc = await newDocument.save(newDocument)
			return res.status(200).json(nDoc)

		}catch(err){
			return res.status(500).json(err)
		}
	},
	deleteDocument: async(req,res)=>{
		try{
			console.log('helllll')
			console.log('req.params: ', req.params)
			
			const document = 
			await Document.findByIdAndDelete({_id: req.params?.id})
			console.log('document: ', document)
			if(!document){
				return res.status(404).json("Xóa thất bại")
			}
			return res.status(200).json("Xóa thành công ")

		}catch(err){
			return res.status(500).json(err)
		}		
	},
	deleteAllDocument: async(req,res)=>{
		try{
			const document = 
			await Document.deleteMany({})
			if(!document){
				return res.status(404).json("Xóa thất bại")
			}
			return res.status(200).json("Xóa tất cả thành công")
		}catch(err){
			return res.status(500).json(err)
		}		
	},

}

module.exports = documentController