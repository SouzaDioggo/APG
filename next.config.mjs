/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Adicionamos esta parte aqui para forçar o WWW
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'apgempresa.com', // Se o usuário acessar SEM www
          },
        ],
        destination: 'http://www.apgempresa.com/:path*', // Manda para COM www
        permanent: true,
      },
    ]
  },
}

export default nextConfig