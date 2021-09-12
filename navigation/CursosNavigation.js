import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import TelaDescricaoCurso from '../telas/TelaDescricaoCurso';
import TelaFiltros from '../telas/TelaFiltros';
import TelaListaCursos from '../telas/TelaListaCursos';


const CursosNavigation = createStackNavigator({
    ListaCursos: TelaListaCursos,
    DescricaoCurso: TelaDescricaoCurso,
    Filtros: TelaFiltros
});

export default createAppContainer(CursosNavigation);