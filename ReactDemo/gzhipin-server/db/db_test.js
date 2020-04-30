const mongoose=require('mongoose')
const md5=require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/test')
const conn=mongoose.connection
conn.on('connected',function () {
    console.log('success!!')
})

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type: String,required: true},
    type:{type:String,required:true},
    header:{type:String}

})

const UserModel=mongoose.model('user',userSchema)

function testSave(){
    const userModel=new UserModel({username:'Bob',password: md5('123'),type:'laoban'})
    userModel.save(function (err,user) {
        console.log("save():",err,user)
    })
}

// testSave()

function testFind(){
    UserModel.find(function (err,users) {
        console.log('find():',err,users)
    })
    UserModel.findOne({_id:'5ea6701fb0a9804d3ffb7dc0'},function (err,user) {
        console.log('findOne():',err,user)

    })

}

// testFind()

function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'5ea6701fb0a9804d3ffb7dc0'},{username:'jack'},function (err,oldUser) {
        console.log("update()",err,oldUser)
    })

}

// testUpdate()

function testDelete(){
    UserModel.remove({_id:'5ea6701fb0a9804d3ffb7dc0'},function (err,user) {
        console.log("remove()",err,user)

    })
}

testDelete()
