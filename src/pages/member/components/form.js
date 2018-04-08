import Address from 'js/addressService.js'

export default{
    data(){
        return{
            name:'',
            tel:'',
            provinceValue:-1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            type:'',
            instance:"",
            addressData:require('js/address.json'),
            cityList:null,
            districtList:null,
        }    

    },
    created(){
        let query = this.$route.query
        this.instance = query.instance
        this.type = query.type
        //console.log(this.instance)

        if(this.type === 'edit' ){
            let ad = this.instance
            this.provinceValue = parseInt(ad.provinceValue)            
            this.name = ad.name
            this.tel = ad.tel
            this.addres = ad.address
            this.id = ad.id
        }
    },
    computed:{
        //设置计算属性获取store中的list【记得lists是指值】
        lists(){
            return this.$store.state.lists
        }
    },
    methods:{
        add(){
            //需要做合法性校验
            let {name,tel,provinceValue,cityValue,districtValue,address} = this
            let data = {name,tel,provinceValue,cityValue,districtValue,address}
            console.log(provinceValue)
            if(this.type ==='add' ){
                // Address.add(data).then(res =>{
                //     this.$router.go(-1)  //转跳到上一层目录
                // }) 
                this.$store.dispatch('addAction',data)
            }

            if( this.type === 'edit'){
                data.id = this.id
                // Address.update(data).then(res=>{
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('updateAction',data)
            }
        },
        remove(){
            if(window.confirm('确认删除吗？')){
                // Address.remove(this.id).then(res => {
                //     this.$router.go(-1)
                // })

                this.$store.dispatch('removeAction',this.id)
            }
        },
        setDefault(){
            // Address.setDefault(this.id).then(res => {
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('setDefaultAction',this.id)
        }
    },
    watch:{
        //监听lists是否变化，若变化就返回上一级
        //若直接用方法（lists（））则只监听数据的增减
        lists:{ //用对象属性深度监听
            handler(){
                this.$router.go(-1)
            },
            deep:true,  //深度监听
        },
        provinceValue(val){
            if(val === -1 ) return
            let list = this.addressData.list
            let index = list.findIndex(item =>{
                return item.value === val
            })
            
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1

            if(this.type === 'edit' ){
                this.cityValue = parseInt(this.instance.cityValue)
            }

        },

        cityValue(val){
            if(val === -1 ) return
            let list = this.cityList
            let index = list.findIndex(item =>{
                return item.value === val
            })
            //console.log(list,index,val,this.provinceValue)
            this.districtList = list[index].children
            this.districtValue = -1

            if(this.type === 'edit' ){
                this.districtValue = parseInt(this.instance.districtValue)
            }

        },



    }
}