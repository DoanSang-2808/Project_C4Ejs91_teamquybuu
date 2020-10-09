const App = {
    Main : function(){
        let signUp = document.querySelector('.btn_signup');
        if(signUp){ 
            signUp.addEventListener('click', this.signUp);
        }
        let logIn = document.querySelector('.btn_login');
        if(logIn){
            logIn.addEventListener('click', this.logIn);
        }
    },
    signUp : function(){
        const account = UIController.getAccount();
        // console.log(account);
        UIController.checkSignUp(account);
        if(UIController.checkSignUp(account) == true){
            LogicController.addAccountList(account);
            UIController.directional('../pages/login.html');
        }
        // console.log(LogicController.accountList);       
    },
    logIn : function(){
        let account = UIController.getAccount_login();
        console.log(account);
        console.log(LogicController.checkAccount(account));
        if(UIController.checkLogIn(account) == true && LogicController.checkAccount(account) == true) {
            console.log(id + user + pass);
            // UIController.showAccount(user,'.header_top_right');
            UIController.directional('../home.html');
            UIController.showAccount(user,'.header_top_right')
        } else if(UIController.checkLogIn(account) != true){
            alert('cần nhập userName và passWord');
        } else if( LogicController.checkAccount(account) != true ){
            alert('tài khoản chưa tồn tại');
        }
    }

};
const UIController = {
    getAccount : function(){
        return account = {
            id_account : LogicController.accountList.length,
            userName : document.querySelector('.add_username').value,
            password : document.querySelector('.add_password').value,
            email : document.querySelector('.add_email').value,
            dateOfBirth : document.querySelector('.add_date').value,
            gender : document.querySelector('.add_gender').value,
        }
    },
    // },
    getPost : function(){
        let cate = document.querySelector('.get_category').value;
        let id_cate = 0;
        for ( let i = 0; i< LogicController.fieldList.length; i++){
            if(fieldList[i].name == cate){
                id_cate = fieldList[i].id;
                break;
            }
        }
        return post = {
            id_post : LogicControler.postList.length,
            title : document.querySelector('.get_title').value,
            category : document.querySelector('.get_category').value,
            content : document.querySelector('.get_content').value,

            
        }
    },
    checkSignUp : function(account){
        username = document.querySelector('#username_alert');
        password = document.querySelector('#password_alert');
        if(account.userName == ""){
            username.textContent = 'Bạn chưa nhập tên đăng nhập';
        }else {
            username.textContent = '';
        }
        if(account.password == ""){
            password.textContent = 'Bạn chưa nhập mật khẩu';
        } else {
            password.textContent = '';
        }
        return true;
    },
    directional : function(link){
        location.assign(link);
    },
    getAccount_login : function(){
        return account = {
            userName : document.querySelector('.value_username').value,
            password : document.querySelector('.value_password').value,
        }
    },
    checkLogIn : function(account){
        if(account.userName == "" || account.password == ""){
            return false;
        } else {
            return true;
        }
    },
    // showAccount : function(account, parentCl){
    //     let raw = ` <p class="home-account">Ai yêu Bác Hồ hơn thiếu niên nhi đồng!</p>`
    //     raw.replace("Ai yêu Bác Hồ hơn thiếu niên nhi đồng!",account)
    //     let ins = document.querySelector('parentCl') ;
    //     ins.insertAdjacentHTML('beforeend', raw)
    // }
   
};

const LogicController = {
    accountList : [],

    postList : [],

    fieldList : [{id:0, name:'CULTURE'}, {id : 1, name : 'BISINESS'}, {id : 2, name : 'FASHION'}, {id : 3, name : 'CREATIVE'}, {id : 4, name : 'TECHNOLOGY'}, {id : 5, name : 'PHOTOGRAPHRE'}],

    commentList : [],

    addAccountList : function(account){
        this.accountList.push(account);
        localStorage.setItem("accountList", JSON.stringify(this.accountList));
    },
    addPost : function(post){
        this.postList.push(post);
        localStorage.setItem("postList", JSON.stringify(postList));
    },
    addComment : function(comment){
        this.commentList.push(comment);
        localStorage.setItem("commentList",JSON.stringify(commentList));
    },
    checkAccount : function(account){
        let arrAccount =JSON.parse(localStorage.getItem('accountList'));
        let count = 0
        for ( let i = 0 ; i < arrAccount.length; i++){
            if(arrAccount[i].userName == account.userName && arrAccount[i].userName == account.userName){
                id = arrAccount[i].id_account;
                user = arrAccount[i].userName;
                pass = arrAccount[i].password;
                break;
            } else {
                count += 1;
            }
        }
        if(count == arrAccount.length){
            return false;
        }
        return true
        //return arrAccount;    
    }

}
App.Main();
let id, user, pass;
 


// let arr = [16,32,72,96];
// let result = [];
// for( let i = 0; i< arr.length; i++){
//     let x = 2;
//     while((Math.pow(arr[i], 1/x) != Math.pow(arr[i],x )){
//         x += 1;
//     }
//     result.push(arr[i]);
// }
// console.log(result);
