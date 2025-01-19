import React, { useState } from 'react';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="min-h-screen flex bg-gray-900">
            {/* Imagen del lado izquierdo */}
            <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"}}>
            </div>

            {/* Contenedor del formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-white">
                            Bienvenido de nuevo
                        </h2>
                        <p className="mt-2 text-sm text-purple-300">
                            Inicia sesión en tu cuenta
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={() => {}}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-purple-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-purple-300">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                                    Registrarse
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;