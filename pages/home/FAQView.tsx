import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQView() {
  return (
    <section className="py-12">
      <div className="text-start max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
        <h2 className="text-[#2f7d32] text-4xl font-bold mb-4 text-center">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Apa itu EcoSmart?</AccordionTrigger>
            <AccordionContent>
              EcoSmart adalah platform yang didedikasikan untuk mempromosikan
              produk yang berkelanjutan dan ramah lingkungan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bagaimana cara membeli produk?</AccordionTrigger>
            <AccordionContent>
              Anda dapat membeli produk langsung melalui platform kami dengan
              mengunjungi halaman produk dan mengikuti instruksi pembelian.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Apakah produknya ramah lingkungan?
            </AccordionTrigger>
            <AccordionContent>
              Ya, semua produk yang terdaftar di EcoSmart telah diperiksa dengan
              cermat untuk memastikan mereka memenuhi kriteria keberlanjutan dan
              ramah lingkungan kami.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Apa saja produk dari Komunitas Unit Katon Selika?
            </AccordionTrigger>
            <AccordionContent>
              Produk:
              <ol className="list-decimal ml-6">
                <li>Bunjel Katsu: Sabun Mijel Katon Semilak</li>
                <li>
                  Aneka ketrampilan daur ulang:
                  <ul className="list-disc ml-6">
                    <li>Bros kain perca</li>
                    <li>Taplak meja kain perca</li>
                    <li>Gantungan kunci</li>
                    <li>Tas kertas</li>
                    <li>Pot galon bekas</li>
                    <li>Pot gantung botol plastik</li>
                  </ul>
                </li>
                <li>
                  Batik ecoprint:
                  <ul className="list-disc ml-6">
                    <li>Tote bag</li>
                    <li>Kain</li>
                    <li>Baju</li>
                    <li>Rok</li>
                    <li>Mukena</li>
                    <li>Hijab</li>
                  </ul>
                </li>
                <li>Kompos Cair</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
