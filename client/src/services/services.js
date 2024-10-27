import axios from "./axiosConfig";

export const getAnswer = async (question) => {
    try{
        const res = await axios.post("get_answer", {question: question});
        const {answer} = res.data;
        return answer;
    }
    catch (err){
        console.log(err)
    }
}

export const buildChain = async (file) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post("build_chain", formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }}).catch(error => console.log(error));
        const {success} = res.data;
        console.log(success);
        return success == true;
    }
    catch (err){
        console.log(err);
        return false;
    }
}