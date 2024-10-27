from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
load_dotenv()

#loading doc
from langchain.document_loaders import PyPDFLoader

#splitting text
from langchain.text_splitter import TokenTextSplitter
chunk_size = 10
chunk_overlap = 0
splitter = TokenTextSplitter(chunk_size = chunk_size, chunk_overlap = chunk_overlap)

#text embeddings
from langchain_openai import OpenAIEmbeddings
embedding = OpenAIEmbeddings()
persist_directory = './chroma_vectorstore3/'

#openai model
from langchain_openai import ChatOpenAI
model_name = "gpt-4o-mini"
llm = ChatOpenAI(model_name = model_name, temperature=0)

#retrieval
from langchain.chains import RetrievalQA
chain;

build_chain_bp = Blueprint('build_chain', __name)
get_answer_bp = Blueprint('get_answer', __name__)

@build_chain_bp.route('/build_chain', methods = ['POST'])
def build_chain():
    #load doc
    loader = PyPDFLoader('~/Documents/RAG-LangChain/Gen-AI-and-LLMs-Snowflake.pdf')
    pages = loader.load()
    #split text
    splits = splitter.split_documents(pages)
    #store embeddings
    vectorstore = Chroma.from_documents(documents = splits, embedding = embedding, persist_directory = persist_directory)
    #RetrievalQA chain
    retriever = vectorstore.as_retriever()
    chain = RetrievalQA.from_chain_type(llm = llm, retriever = retriever)

@get_answer_bp.route('/get_answer', methods = ['POST'])
def get_answer():
    question = request.json['question']
    answer = chain.invoke(question)['result']
    return jsonify({answer: answer})