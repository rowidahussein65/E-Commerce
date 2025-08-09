import { useState } from "react";
import { motion as Motion } from "framer-motion"; // إعادة التسمية عشان نتجنب تحذير ESLint
import DetailsModal from "./DetailsModal/DetailsModal";

import apple from "../../assets/product/apple.png";
import canon from "../../assets/product/canon.png";
import dell from "../../assets/product/dell.png";
import honor from "../../assets/product/honor.png";
import huawei from "../../assets/product/huawei.png";
import sony from "../../assets/product/sony.png";
import oppo from "../../assets/product/oppo.png";
import xiaomi from "../../assets/product/xiaomi.png";
import samsung from "../../assets/product/samsung.png";
import realme from "../../assets/product/realme.png";
import nokia from "../../assets/product/nokia.png";
import lenovo from "../../assets/product/lenovo.png";

export default function Brands() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const brands = [
    { id: 1, title: "apple", image: apple },
    { id: 2, title: "canon", image: canon },
    { id: 3, title: "Dell", image: dell },
    { id: 4, title: "Honor", image: honor },
    { id: 5, title: "huawei", image: huawei },
    { id: 6, title: "sony", image: sony },
    { id: 7, title: "oppo", image: oppo },
    { id: 8, title: "xiaomi", image: xiaomi },
    { id: 9, title: "samsung", image: samsung },
    { id: 10, title: "realme", image: realme },
    { id: 11, title: "nokia", image: nokia },
    { id: 12, title: "lenovo", image: lenovo },
  ];

  return (
    <>
      <section className="container mx-auto px-4">
        <Motion.h2
          className="text-3xl font-bold text-center m-20 text-green-600 text-2xl"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          All Brands
        </Motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 shadow-lg gap-8">
          {brands.map((brand) => (
            <Motion.div
              key={brand.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
              onClick={() => {
                setSelectedBrand(brand);
                setIsOpen(true);
              }}
            >
              <img
                src={brand.image}
                alt={brand.title}
                className="w-full h-70 object-contain p-4 img-fluid"
              />
              <div className="p-4">
                <h3 className="text-sm text-center font-medium">
                  {brand.title}
                </h3>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      <DetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        brand={selectedBrand}
      />
    </>
  );
}
