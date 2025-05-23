
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-legal-primary" />
              <span className="font-bold text-xl">Правовой Компас</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Ваш интеллектуальный юридический помощник. Получите ответы на правовые вопросы и создайте нужные документы.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-legal-primary text-sm">Главная</Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-legal-primary text-sm">Консультация</Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-600 hover:text-legal-primary text-sm">Документы</Link>
              </li>
              <li>
                <Link to="/analysis" className="text-gray-600 hover:text-legal-primary text-sm">Анализ договоров</Link>
              </li>
              <li>
                <Link to="/premium" className="text-gray-600 hover:text-legal-primary text-sm">Премиум доступ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Правовая информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-legal-primary text-sm">Условия использования</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-legal-primary text-sm">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-legal-primary text-sm">Правовая оговорка</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-legal-primary text-sm">О нас</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Email: info@pravovoycompas.ru</li>
              <li className="text-gray-600 text-sm">Телефон: +7 (800) 123-45-67</li>
              <li className="mt-4">
                <Link 
                  to="/premium" 
                  className="inline-block bg-legal-primary hover:bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Получить Премиум
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Правовой Компас. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-legal-primary">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-legal-primary">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-legal-primary">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-legal-primary">
              <span className="sr-only">Telegram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0Zm.155 18.222c-.387 0-.247-.146-.698-.592l-1.748-1.698-3.33 2.26.004.003-.006-.003c.173-.232.47-.547.47-.547l.79-1.646-.001-.001.001-.002-.869-.262s-3.096-1.088-3.096-5.144c0-.125.012-.236.012-.36a.513.513 0 0 1 .184-.035c.255.004 1.138.086 1.889 1.272 0 0 .986 1.195 2.223 1.888 0 0 2.307 1.061 6.258-.308 0 0 .938-.693 1.141-1.115 0 0 .338-.867-.112-.859 0 0-.964.055-2.243.393 0 0-3.478 1.145-6.007.218 0 0-2.097-.717-2.716-2.16 0 0-.617-1.009.182-1.521 0 0 2.244-1.33 4.22.236 0 0 .826.591 1.45.307 0 0 .577-.225.326-.66 0 0-.415-.51-1.77-.639 0 0-1.871-.28-1.62-1.344 0 0 .195-.741 1.568-.424 0 0 4.134 1.344 6.049-1.136 0 0 .674-1.136-.562-1.203 0 0-2.186.51-2.978-.054 0 0-.729-.535.391-.806 0 0 4.315-1.777 7.775 1.812 0 0 .981 1.777-.045 3.332 0 0-.701 1.104-1.53 1.75 0 0-2.168 1.528-4.866 1.96 0 0-2.721.487-5.087-1.208 0 0-1.333-.997-1.048-2.049 0 0 .342-.947 2.107-.741 0 0 .981.08 1.333-.334 0 0 .256-.346.136-.586 0 0-.391-.569-1.333-.435 0 0-3.388.702-2.766-2.717 0 0 .374-1.98 3.609-2.05 0 0 2.495.054 4.117 2.01 0 0 .54.661 1.198.155 0 0 .617-.502.129-.874 0 0-.781-.854-2.248-.914 0 0-1.63-.155-1.62-1.097 0 0 .074-.845 1.685-.678 0 0 4.134.502 6.657-2.638 0 0 .814-1.037-.065-1.228 0 0-2.074.208-2.927-.4 0 0-.693-.486.424-.807 0 0 4.56-1.63 7.501 1.793 0 0 1.137 1.691-.293 3.635 0 0-1.011 1.208-2.01 1.804 0 0-3.468 2.01-7.756.4 0 0-2.01-.781-1.62-2.354 0 0 .146-1.037 1.748-1.101 0 0 1.011-.08 1.46-.502 0 0 .354-.487-.064-.713 0 0-.648-.372-1.49-.097 0 0-3.258.997-2.383-2.736 0 0 .453-2.143 3.867-1.995 0 0 2.806.064 4.498 2.296 0 0 .465.651 1.193.091 0 0 .572-.495.145-.859 0 0-.725-.765-2.18-.926 0 0-1.62-.146-1.64-1.144 0 0 .045-.893 1.63-.67 0 0 4.188.567 6.74-2.67 0 0 .736-1.081-.08-1.213 0 0-1.975.252-2.868-.318 0 0-.754-.543.391-.9 0 0 4.56-1.577 7.573 1.959 0 0 .818 1.407-.11 3.124 0 0-.919 1.455-2.16 2.09 0 0-3.293 1.683-7.345.252 0 0-2.133-.865-1.726-2.433 0 0 .126-1.073 1.799-.997 0 0 1.058-.017 1.5-.518 0 0 .382-.502-.109-.71 0 0-.556-.364-1.517-.109 0 0-3.276.882-2.243-2.904 0 0 .566-2.06 3.731-1.85 0 0 3.01.129 4.57 2.498 0 0 .402.634 1.076.11 0 0 .658-.536.091-.917 0 0-.63-.693-2.297-.792"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
