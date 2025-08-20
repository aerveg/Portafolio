import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SobreMi } from './pages/sobre-mi/sobre-mi';
import { Proyectos } from './pages/proyectos/proyectos';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'sobre-mi', component: SobreMi },
  { path: 'proyectos', component: Proyectos },
  { path: 'contacto', component: Contacto },
];