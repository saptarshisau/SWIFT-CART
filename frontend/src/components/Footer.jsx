
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from '@mui/icons-material'
import '../componentStyles/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Section1 */}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><Phone fontSize='small' />Phone : +91 9830013866</p>
                    <p><Mail fontSize='small' />Email : saptarshisau09@gmail.com</p>
                </div>

                {/* Section2 */}
                <div className="footer-section social">
                    <h3>Follow me</h3>
                    <div className="social-links">
                        <a href="https://github.com/saptarshisau" target="_blank">
                            <GitHub className='social-icon' />
                        </a>
                        <a href="https://www.linkedin.com/in/saptarshi-sau-97174a283/" target="_blank">
                            <LinkedIn className='social-icon' />
                        </a>
                        <a href="https://www.youtube.com/@saptarshisau09" target="_blank">
                            <YouTube className='social-icon' />
                        </a>
                        <a href="https://www.instagram.com/saptarshi_sau_08/" target="_blank">
                            <Instagram className='social-icon' />
                        </a>
                    </div>
                </div>

                {/* Section3 */}
                <div className="footer-section about">
                    <h3>About</h3>
                    <p>Creating quality products for our customers</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Saptarshi Sau . All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
