import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const socialLinks = [
    { href: "https://github.com/saptarshisau", Icon: GitHub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/saptarshi-sau-97174a283/", Icon: LinkedIn, label: "LinkedIn" },
    { href: "https://www.youtube.com/@saptarshisau09", Icon: YouTube, label: "YouTube" },
    { href: "https://www.instagram.com/saptarshi_sau_08/", Icon: Instagram, label: "Instagram" }
]

function Footer() {
    return (
        <footer className="mt-8 bg-slate-900 py-8 text-slate-300 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
            <div className="mx-auto flex max-w-300 flex-col items-center gap-8 px-4 text-center md:flex-row md:items-start md:justify-between md:text-left">
                {/* Section1 */}
                <div className="w-full flex-1 md:min-w-62.5">
                    <h3 className="mb-4 text-xl font-semibold text-white">Contact Us</h3>
                    <p className="mb-3 leading-normal"><Phone fontSize='small' /> Phone : +91 9830013866</p>
                    <p className="mb-3 leading-normal"><Mail fontSize='small' /> Email : saptarshisau09@gmail.com</p>
                </div>

                {/* Section2 */}
                <div className="flex w-full flex-1 flex-col items-center gap-4 md:min-w-62.5">
                    <h3 className="text-xl font-semibold text-white">Follow me</h3>
                    <div className="flex justify-center gap-4">
                        {socialLinks.map(({ href, Icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                className="text-slate-400 transition duration-300 hover:scale-110 hover:text-indigo-400">
                                <Icon fontSize="large" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section3 */}
                <div className="w-full flex-1 md:min-w-62.5">
                    <h3 className="mb-4 text-xl font-semibold text-white">About</h3>
                    <p className="mb-3 leading-normal">Creating quality products for our customers</p>
                    <div className="flex justify-center gap-4 md:justify-start">
                        <Link to="/about-us" className="text-indigo-400 transition-colors hover:text-indigo-300 hover:underline">About Us</Link>
                        <Link to="/contact-us" className="text-indigo-400 transition-colors hover:text-indigo-300 hover:underline">Contact Us</Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-slate-700 pt-6 text-center text-slate-400">
                <p>&copy; 2026 Saptarshi Sau . All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
