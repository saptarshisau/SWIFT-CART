import { useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'

const CONTACT_EMAIL = 'saptarshisau09@gmail.com'
const CONTACT_PHONE = '+91 9830013866'
const inputClass = 'w-full rounded-md border border-slate-300 bg-white p-3 text-slate-800 outline-none transition-colors focus:border-indigo-500'

function ContactUs() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const { name, email, message } = form
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim()) return toast.error('Please enter your name', { position: 'top-center', autoClose: 3000, toastId: 'name' })
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return toast.error('Please enter a valid email address', { position: 'top-center', autoClose: 3000, toastId: 'email' })
        if (!message.trim()) return toast.error('Please write a message', { position: 'top-center', autoClose: 3000, toastId: 'message' })
        const subject = encodeURIComponent(`SwiftCart enquiry from ${name.trim()}`)
        const body = encodeURIComponent(`${message.trim()}\n\nFrom: ${name.trim()} (${email.trim()})`)
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    }

    return (
        <>
            <PageTitle title="Contact Us | SwiftCart" />
            <Navbar />
            <section className="mt-16 bg-linear-to-br from-indigo-600 to-indigo-800 px-6 py-16 text-center text-white">
                <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
                <p className="mx-auto max-w-xl text-lg text-indigo-100">Questions, feedback or need help with an order? Send us a message.</p>
            </section>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-slate-800">Get in touch</h2>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"><PhoneIcon /></span>
                        <span>
                            <span className="block text-sm text-slate-500">Phone</span>
                            <span className="font-semibold text-slate-800">{CONTACT_PHONE}</span>
                        </span>
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"><MailIcon /></span>
                        <span>
                            <span className="block text-sm text-slate-500">Email</span>
                            <span className="font-semibold break-all text-slate-800">{CONTACT_EMAIL}</span>
                        </span>
                    </a>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <h2 className="text-2xl font-bold text-slate-800">Send a message</h2>
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">Name <span className="text-red-500">*</span></label>
                        <input id="name" name="name" type="text" value={name} onChange={handleChange} placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">Email <span className="text-red-500">*</span></label>
                        <input id="email" name="email" type="email" value={email} onChange={handleChange} placeholder="yourname@example.com" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-700">Message <span className="text-red-500">*</span></label>
                        <textarea id="message" name="message" rows={5} value={message} onChange={handleChange} placeholder="How can we help?" className={`${inputClass} resize-y`} />
                    </div>
                    <button className="rounded-md bg-indigo-600 p-3 font-medium text-white transition-colors duration-300 hover:bg-indigo-700">Send Message</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs
