from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from dotenv import load_dotenv
load_dotenv()
import os

#loading doc
from langchain_community.document_loaders import PyPDFLoader

#splitting text
from langchain.text_splitter import TokenTextSplitter
chunk_size = 10
chunk_overlap = 0
splitter = TokenTextSplitter(chunk_size = chunk_size, chunk_overlap = chunk_overlap)

#text embeddings
from langchain_community.vectorstores.chroma import Chroma
import chromadb
from langchain_openai import OpenAIEmbeddings
embedding = OpenAIEmbeddings()
persist_directory = './chroma_vectorstore3/'

#openai model
from langchain_openai import ChatOpenAI
model_name = "gpt-4o-mini"
llm = ChatOpenAI(model_name = model_name, temperature=0)

#retrieval
from langchain.chains import RetrievalQA
chain = None

build_chain_bp = Blueprint('build_chain', __name__)
get_answer_bp = Blueprint('get_answer', __name__)

@build_chain_bp.route('/build_chain', methods = ['POST'])
@cross_origin(origins='http://localhost:5173')
def build_chain():
    try:
        global chain
        #temporarily save file
        file = request.files['file']
        temp_file_path = os.path.join('/tmp', file.filename)
        file.save(temp_file_path)
        #load doc
        loader = PyPDFLoader(temp_file_path)
        pages = loader.load()
        #split text
        splits = splitter.split_documents(pages)
        #store embeddings
        vectorstore = Chroma.from_documents(documents = splits, embedding = embedding, persist_directory = persist_directory)
        #RetrievalQA chain
        retriever = vectorstore.as_retriever()
        chain = RetrievalQA.from_chain_type(llm = llm, retriever = retriever)
        #remove file from storage
        os.remove(temp_file_path)
        return jsonify({'success': True})
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 404

@get_answer_bp.route('/get_answer', methods = ['POST'])
@cross_origin(origins='http://localhost:5173')
def get_answer():
    try:
        global chain
        question = request.json['question']
        answer = chain.invoke(question)['result']
        return jsonify({'answer': answer})
    except Exception as e:
        print(e)
        return jsonify({'answer': False}), 400
