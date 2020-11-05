ClassicEditor
    .create(document.querySelector('#content'), {
        language:"zh-cn",
        //指定上传地址
        ckfinder:{
            uploadUrl:'/articles/uploadImage'
        }
    })
    .catch(error => {
        console.log(error);
    });