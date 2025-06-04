import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage, LoginPage, RegisterPage } from './pages';


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}