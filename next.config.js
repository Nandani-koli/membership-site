/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [
        'res.cloudinary.com',
        'camo.githubusercontent.com',
        'raw.githubusercontent.com',
          'upload.wikimedia.org',
          'nodejs.org',
          'git-scm.com',
          'github.githubassets.com',
          'cdn-icons-png.flaticon.com',
          'vectorlogo.zone'
        ],
      },
}

module.exports = nextConfig
