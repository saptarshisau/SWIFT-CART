import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

const values = [
    { Icon: VerifiedIcon, title: 'Quality First', text: 'Every product on SwiftCart is picked with care so you get things that last.' },
    { Icon: LocalShippingIcon, title: 'Swift Delivery', text: 'We keep the path from cart to doorstep short, simple and reliable.' },
    { Icon: SupportAgentIcon, title: 'Real Support', text: 'Questions or problems? A real person is always ready to help you out.' }
]

function AboutUs() {
    return (
        <>
            <PageTitle title="About Us | SwiftCart" />
            <Navbar />
            <section className="mt-16 bg-linear-to-br from-indigo-600 to-indigo-800 px-6 py-20 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About SwiftCart</h1>
                <p className="mx-auto max-w-2xl text-lg text-indigo-100">Creating quality products for our customers, with a shopping experience that feels quick and effortless.</p>
            </section>

            <section className="mx-auto max-w-4xl px-6 py-16">
                <h2 className="mb-4 text-center text-3xl font-bold text-slate-800">Our Story</h2>
                <p className="mb-4 leading-relaxed text-slate-600">SwiftCart started as a simple idea: online shopping should be fast, honest and enjoyable. We built a store where you can browse, search, review and buy without the clutter.</p>
                <p className="leading-relaxed text-slate-600">From the product catalogue to secure checkout and order tracking, every part of SwiftCart is designed to save your time and earn your trust.</p>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-16">
                <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">What We Stand For</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {values.map(({ Icon, title, text }) => (
                        <div key={title} className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                <Icon />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>
                            <p className="text-slate-600">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-8 max-w-4xl rounded-xl bg-slate-50 px-6 py-12 text-center">
                <h2 className="mb-3 text-2xl font-bold text-slate-800">Want to know more?</h2>
                <p className="mb-6 text-slate-600">We would love to hear from you.</p>
                <Link to="/contact-us" className="inline-block rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-indigo-700">Contact Us</Link>
            </section>
            <Footer />
        </>
    )
}

export default AboutUs
