// import 'babel-polyfill';
import Linker from './parser/linker';
import History from './parser/histroy';

const options =  {
  id: 1,  
  lang: 'zh',
  spa: true,
  debug: true,
}

const linker = new Linker(options);
const history = new History(options);
