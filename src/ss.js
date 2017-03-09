<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title> {$action} | {:get_opinion('title')}</title>

    <include file="Public:head"/>
    <style type="text/css">
        .layerBac{position: fixed;top:0;left:0;right:0;bottom:0;background: rgba(0,0,0,0.5)}
        .layerWrap{position:absolute;top:0;left:0;}
    </style>
    <script type="text/javascript" src="{$Think.config.STATIC_DIR}/Public/Mob/src/vendor/js/vue.js"></script>
<!--     <link rel="stylesheet" href="/Public/AdminLTE/css/baobei.css" /> -->
</head>
<body class="skin-blue">

{:W('Common/header')}

<div class="wrapper row-offcanvas row-offcanvas-left" id="detail">
    {:W('Common/sideMenu')}
    <!-- Right side column. Contains the navbar and content of the page -->
    <aside class="right-side">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                {$action}
                <small>{:get_opinion('title')}</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="{$module_url}"><i class="fa fa-dashboard"></i> {$module}</a></li>
                <li class="active">{$action}</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div>
                <a class="btn btn-success" href="javascript:;" @click="option.display=true">重新创建</a>
                <hr/>
            </div>
            <div>
                <!--详情-->
                <div class="row">
                    <div class="col-xs-8">
                        <table class="table table-bordered">
                            <tbody>
                            <!--<tr>
                                <td style="width: 20%;">编号</td>
                                <td style="width: 30%;" colspan="3" v-text="info.id"></td>
                            </tr>-->
                            <tr>
                                <td style="width: 20%;">UID</td>
                                <td style="width: 30%;" v-text="info.uid" class="clipboardEle" v-bind:data-clipboard-text="info.uid"></td>
                                <td style="width: 20%;">
                                    <strong class="text-danger">*报备日期</strong>
                                </td>
                                <td style="width: 30%;" style="position: relative;">
                                    <input type="text" v-model="info.baobei_time" class="form-control" ref="baobeiTime"/>
                                </td>
                            </tr>
                            <tr>
                                <td>交易编码</td>
                                <td v-text="info.deal_acount" class="clipboardEle" v-bind:data-clipboard-text="info.deal_acount"></td>
                                <td>首日入金日期</td>
                                <td v-text="info.start_time"></td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td v-text="info.user_name" class="clipboardEle" v-bind:data-clipboard-text="info.user_name"></td>
                                <td><strong class="text-danger">报备到账日期</strong></td>
                                <td><strong class="text-danger" v-text="info.end_time"></strong></td>
                            </tr>
                            <tr>
                                <td>手机号</td>
                                <td v-text="info.mobile"></td>
                                <td><strong class="text-danger">*报备金额(万)</strong></td>
                                <td style="position: relative" ><input type="text" class="form-control" v-model.lazy="info.amt" ref="amt" @change="validateAmt"/></td>
                            </tr>
                            <tr>
                                <td>流转单状态</td> 
                                <td v-text="info.flow_status"></td>
                                <td><strong class="text-danger">非工作日可入金</strong></td>
                                <td>
                                    <input style="cursor:pointer" v-model="info.is_trading" id="is_deposit" type="checkbox" name="deposit" @change="validateAmt"  />&nbsp;&nbsp;<label for="is_deposit" style="cursor:pointer">非工作日（周末或节假日）入金</label>
                                </td>
                            </tr>
                            <tr>
                                <td>开户渠道</td>
                                <td colspan="3" v-text="info.channel"></td>
                            </tr>
                            <tr>
                                <td>备注</td>
                                <td colspan="3">
                                    <textarea class="form-control" v-model="info.note"></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <div class="text-center">
                            <input type="button" value="提交" class="btn btn-success" @click="create"/>
                        </div>
                    </div>
                </div>
                <!--详情E-->
            </div>
        </section>
        <!-- /.content -->
    </aside>
    <!-- /.right-side -->
    <layer v-bind:option="option" v-show="option.display" @close="option.display = false">
        <div slot="title">新建报备单</div>
        <div slot="content">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-2 control-label">交易编码:</label>
                    <div class="col-sm-6">
                        <input class="form-control" placeholder="交易编码" v-model="dealAccount">
                    </div>
                </div>
            </form>
        </div>
        <template slot="footer">
            <input type="button" value="确定" class="btn btn-success" @click="getUserInfo(dealAccount)"/>
            <input type="button" value="取消" class="btn btn-warning" @click="option.display=false"/>
        </template>
    </layer>
</div>
<!-- ./wrapper -->

<include file="Public:foot"/>
<script type="x-template" id="layer">
    <div>
        <div class="layerBac"></div>
        <div v-bind:style="option.styleObj" ref="layerContent" class="layerWrap">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <button type="button" class="close" @click="$emit('close')"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h3 class="panel-title"><slot name="title"></slot></h3>
                </div>
                <div class="panel-body">
                    <slot name="content"></slot>
                </div>
                <div class="text-center panel-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</script>
<script type="x-template" id="viewObj">
</script>
<script type="text/javascript">
    function centerEle($ele){
        var winWidth=window.innerWidth,winHeight=window.innerHeight,
            width=$ele.outerWidth(),height=$ele.outerHeight(),$win=$(window),
            top=$win.scrollTop(),left=$win.scrollLeft();
        $ele.css({
            "WebkitTransform":"translate("+(parseInt((winWidth-width)/2)+left)+"px,"+(parseInt((winHeight-height)/2)+top)+"px)"
        });
    }
    Vue.component("layer",{
        template:"#layer",
        props:["option"],
        mounted:function(){
            centerEle($(this.$refs.layerContent));
            this.$watch("option.display",function(newValue){
                if(newValue){
                    centerEle($(this.$refs.layerContent))
                }
            });
            $(window).bind("resize",function(){
                if(this.option.display){
                    centerEle($(this.$refs.layerContent));
                }
            }.bind(this))
        },
        methods:{

        }
    });
    var vm=new Vue({
        el:"#detail",
        /*template:"#viewObj",*/
        data:{
            dealAccount:"",
            info:{
                is_trading:0
            },
            option:{
                styleObj:{width:"500px"},
                display:true
            }
        },
        mounted:function(){
            $(this.$refs.baobeiTime).datetimepicker({
                format: 'YYYY-MM-DD'
            }).on("dp.change",function(){
                this.$set(this.info,"baobei_time",this.$refs.baobeiTime.value);
                this.tryComputeEndTime();
            }.bind(this));
        },
        methods:{
            getUserInfo:function(dealAccount){
                if(!dealAccount){
                    return;
                }
                var data={
                    interface:"",
                    deal_acount:dealAccount
                };
                $.ajax({
                    url:"/admin/baobei/userinfo",
                    data:data,
                    dataType:"json",
                    method:"get"
                }).then(function(res){
                    if(res.code==1){
                        if(!res.result.uid){
                            alert("没有找到该用户的uid");
                            return;
                        }
                        this.option.display=false;
                        this.info=res.result;
                    }else{
                        alert(res.message);
                    }
                }.bind(this))
            },
            validateAmt:function(){
                this.info.amt=parseFloat(this.info.amt)||"";
                this.$refs.amt.value=parseFloat(this.info.amt)||"";
                this.tryComputeEndTime();
            },
            tryComputeEndTime:function(){
                if(!this.info.amt||!this.info.baobei_time){
                    this.$set(this.info,"end_time","");
                }else{
                    this.getEndTime();
                }
            },
            getEndTime:function(){
                $.ajax({
                   url:"/admin/baobei/getendtime",
                    method:"get",
                    dataType:"json",
                    data:{
                       amt:this.info.amt*10000,
                       date:this.info.baobei_time,
                       is_trading:this.info.is_trading ? 1 : 0 
                    }
                }).then(function(res){
                    if(res.code==1){
                        //this.info.end_time=res.result.end_time;
                        this.$set(this.info,"end_time",res.result.end_time);
                    }
                }.bind(this));
            },
            create:function(){
                if(!parseFloat(this.info.amt)||!this.info.uid||!this.info.baobei_time){
                    return;
                }
                $.ajax({
                    url:"/admin/baobei/add",
                    data:{
                        interface:"add",
                        uid:this.info.uid,
                        baobei_time:this.info.baobei_time,
                        amt:this.info.amt*10000,
                        note:this.info.note,
                        is_trading:this.info.is_trading ? 1 : 0 
                    },
                    dataType:"json",
                    method:"post"
                }).then(function(res){
                    if(res.code==1){
                        window.location.href="/admin/baobei/detail?id="+res.result.id;
                    }else{
                        alert(res.message+":"+res.result);
                    }
                })
            }
        }
    })
</script>
</body>
</html>
