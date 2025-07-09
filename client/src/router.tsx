import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage, RegisterPage } from './pages';
import { AuthLayout } from './layouts';
import AppLayout from './layouts/AppLayout';


export default function Router() {


    return (
        <BrowserRouter>

            <Routes>
                {/* Auth */}
                <Route element={ <AuthLayout /> }>
                    <Route path='/auth/login' element={<LoginPage />} />
                    <Route path='/auth/register' element={<RegisterPage />} />
                </Route>

                {/* Public */}
                <Route 
                    element={ <AppLayout /> }
                    path='/admin'
                >
                    <Route index={ true }></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

// Con index la ruta toma el path del padre y hereda el diseno del layout