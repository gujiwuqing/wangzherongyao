import Vue from 'vue'
import { Button,Menu,MenuItem,MenuItemGroup,Submenu,RadioButton,RadioGroup,Breadcrumb,BreadcrumbItem,Form,FormItem,Input} from 'element-ui'

const components = {Button,Menu,MenuItem,MenuItemGroup,Submenu,RadioButton,RadioGroup,Breadcrumb,BreadcrumbItem,Form,FormItem,Input}

const componentsHandler = {
    install(Vue){
        Object.keys(components).forEach(key => Vue.use(components[key]))
    }
}

export default componentsHandler
