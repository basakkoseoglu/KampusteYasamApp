import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from 'axios'

//Cloudinary’nin resim yükleme APIsinin url tanımlanması
const CLOUDINARY_API_URL=`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

//dosyayı yükleme cloudinarya
export const uploadFileToCloudinary=async(
    file:{uri?: string} | string, //yüklemek istenen dosya
    folderName:string  //dosya hangi klasöre kaydolacak
): Promise<ResponseType>=>{
    try{
        if(typeof file == 'string'){
            return {success:true,data:file};
        }   //eğer dosya bir string ise url olduğunu varsayar ve fonk başarıyla döner
        if(file && file.uri){ //eğer dosyanın içinde bir obje ve içinde uri varsa bu durumda cloduinarye yükleme işlemi gerçekleştirilir.
            const formData=new FormData();   //dosya yükleme işlemi için formdata nesnesi oluşturulur
            formData.append("file",{
                uri:file?.uri,  // yüklemek istenilen dosyanın yolu
                type:"image/jpeg", //tipi
                name:file?.uri?.split("/").pop() || "file.jpg"
            } as any);
            formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder",folderName);

            //form data kullanarak cloudinary apisına post isteği gönderilir
            const response =await axios.post(CLOUDINARY_API_URL,formData,{
                headers:{
                    "Content-Type":"multipart/form-data", //http isteğinin gövdesinin birden fazla parçaya bölünerek giderilmesini sağlar
                },
            });
            console.log("resim yükleme sonucu: ",response?.data);
            return {success:true,data:response?.data?.secure_url};
        }
            return {success:true};
    }catch(error:any){
        console.log('dosya yüklemede hata oluştu',error);
        return {success:false,msg:error.message || "Dosya Yüklenemedi."}
    }

}
export const getProfileImage=(file:any)=>{
    if(file && typeof file== "string") return {uri:file};
    if(file && typeof file== "object") return {uri:file.uri};

    return require('../assets/images/defaultAvatar.png');
}