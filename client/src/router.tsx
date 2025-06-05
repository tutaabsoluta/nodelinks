import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage, RegisterPage } from './pages';
import { AuthLayout } from './layouts';


export default function Router() {


    return (
        <BrowserRouter>

            <Routes>
                <Route element={ <AuthLayout /> }>
                    <Route path='/auth/login' element={<LoginPage />} />
                    <Route path='/auth/register' element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}