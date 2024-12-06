'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "What exactly is a QR code?",
    answer: "A QR code is like a souped-up barcode. It's a square pattern of black and white dots that can store all sorts of information - websites, text, contact details, you name it! When scanned with a smartphone camera or QR reader app, it quickly takes you to whatever info is stored in the code."
  },
  {
    question: "Do I need special software to scan QR codes?",
    answer: "Nope! Most modern smartphones can scan QR codes right from the camera app. Just point and shoot! If your phone's a bit older, you might need to download a free QR code reader app from your app store. Easy peasy!"
  },
  {
    question: "Can I make QR codes for anything?",
    answer: "You bet! Our QR code generator lets you create codes for websites, plain text, contact info, WiFi networks, and more. If you can think it, you can probably QR code it!"
  },
  {
    question: "Are the QR codes I create permanent?",
    answer: "Yes, the QR codes you generate with us are permanent and won't expire. However, if you're linking to a website, make sure that website stays active. If the website goes down, the QR code won't have anywhere to send people!"
  },
  {
    question: "Can I customize how my QR code looks?",
    answer: "Absolutely! You can change colors, add a logo, and even play around with the shape of the dots. Just remember, the more you customize, the more you should test to make sure it still scans easily."
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Card className="bg-white rounded-xl shadow-sm p-6">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AnimatePresence>
                {openItems.includes(`item-${index}`) && (
                  <AccordionContent forceMount>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                )}
              </AnimatePresence>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </section>
  )
}

