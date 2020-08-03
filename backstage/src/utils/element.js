import Vue from 'vue'

import {
    Button,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    RadioButton,
    RadioGroup,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    Select,
    Card,
    Message,
    Option,
    OptionGroup,
    Table,
    TableColumn,
    Pagination,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Avatar,
    MessageBox,
    Dialog
} from 'element-ui'


Vue.use(Button).use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu).use(RadioButton).use(RadioGroup).use(Breadcrumb).use(BreadcrumbItem).use(Form).use(FormItem).use(Input).use(Select).use(Card).use(Option).use(OptionGroup).use(Table).use(TableColumn).use(Pagination).use(DropdownMenu).use(DropdownItem).use(Dropdown)
    .use(Avatar).use(Dialog)

Vue.prototype.$message = Message;
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$confirm = MessageBox.confirm;
