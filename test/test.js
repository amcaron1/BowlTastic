db.Employee.findAll({}).then(response=>{
        for(let i in response){
            var hash = bcrypt.hashSync(response[i].dataValues.password, 10);

            db.Employee.update({password:hash},{where:{id:response[i].dataValues.id}})

        }
});
