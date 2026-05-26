"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────────────────

interface ProductImagesProps {
  id: string
  label: string          // bijv. "Features", "Quality closeup"
  thumbnail?: string     // optioneel: apart thumbnail-pad (default = images[0])
  images: string[]       // [0] = hoofdafbeelding, [1] = hover-afbeelding
}

interface ProductCardImagesProps {
  productImages: ProductImagesProps[]
  activeColor: number
  activeImage: number
  handleMouse: (event: "enter" | "leave") => void
  className?: string
}

// ─── Hook ──────────────────────────────────────────────────────────────────

const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

function useSetActiveProduct(initialColor = 0) {
  const [state, setState] = React.useState({
    activeColor: initialColor,
    activeImage: 0,
  })

  const handleColorChange = React.useCallback((index: number) => {
    setState((prev) => ({ ...prev, activeColor: index }))
  }, [])

  const handleMouse = React.useCallback((event: "enter" | "leave") => {
    setState((prev) => ({
      ...prev,
      activeImage: event === "enter" ? 1 : 0,
    }))
  }, [])

  return { ...state, handleColorChange, handleMouse }
}

// ─── Image stack ───────────────────────────────────────────────────────────

function ProductCardImages({
  productImages,
  activeColor,
  activeImage,
  handleMouse,
  className,
}: ProductCardImagesProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {productImages.map((productImage, index) => (
        <motion.div
          key={productImage.id}
          variants={variants}
          animate={index === activeColor ? "visible" : "hidden"}
          className="absolute inset-0 cursor-pointer overflow-hidden"
        >
          <div
            onMouseEnter={() => handleMouse("enter")}
            onMouseLeave={() => handleMouse("leave")}
            className="relative w-full h-full"
          >
            {/* Hoofdafbeelding */}
            <Image
              alt={productImage.label}
              fill
              className="object-contain"
              src={productImage.images[0]}
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
            />

            {/* Hover-afbeelding (images[1]) */}
            {productImage.images[1] && (
              <AnimatePresence>
                <motion.div
                  key="hover"
                  variants={variants}
                  className="absolute inset-0"
                  animate={
                    activeImage === 1 && index === activeColor
                      ? "visible"
                      : "hidden"
                  }
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    alt={`${productImage.label} — detail`}
                    fill
                    className="object-contain"
                    src={productImage.images[1]}
                    sizes="(max-width: 768px) 100vw, 800px"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Thumbnail navigatie ────────────────────────────────────────────────────

const springTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 50,
  mass: 1,
}

interface ProductThumbsProps {
  productId: string
  productImages: ProductImagesProps[]
  activeColor: number
  setActiveColor: (index: number) => void
  className?: string
}

function ProductThumbs({
  productId,
  productImages,
  activeColor,
  setActiveColor,
  className,
}: ProductThumbsProps) {
  return (
    <div className={cn("flex gap-2 justify-center mt-3 flex-wrap", className)}>
      {productImages.map((img, index) => (
        <button
          key={img.id}
          role="button"
          aria-label={`Bekijk ${img.label}`}
          title={img.label}
          className="relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0"
          style={{
            borderColor: index === activeColor
              ? "rgba(255, 107, 0, 0.9)"
              : "rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.4)",
          }}
          onClick={() => setActiveColor(index)}
          onMouseEnter={() => setActiveColor(index)}
        >
          <Image
            alt={img.label}
            fill
            className="object-contain p-0.5"
            src={img.thumbnail ?? img.images[0]}
            sizes="48px"
            loading="lazy"
          />
          {index === activeColor && (
            <motion.div
              layoutId={productId}
              className="absolute inset-0 rounded-md"
              style={{ border: "2px solid rgba(255,107,0,0.7)", borderRadius: 6 }}
              transition={springTransition}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Exports ───────────────────────────────────────────────────────────────

interface ProductCardProps {
  id: string
  images: ProductImagesProps[]
  aspectClass?: string    // Tailwind aspect-ratio class, default "aspect-[4/3]"
  className?: string
  showThumbs?: boolean
}

/**
 * ProductCard — image gallery met hover-reveal en thumbnail-navigatie.
 * Gebaseerd op het ProductCard patroon: één hoofdafbeelding actief tegelijk,
 * hover wisselt naar images[1] (detail/hover shot van dezelfde slide).
 * Thumbnails onderaan selecteren de actieve afbeelding.
 */
export function ProductCard({
  id,
  images,
  aspectClass = "aspect-[4/3]",
  className,
  showThumbs = true,
}: ProductCardProps) {
  const { activeColor, activeImage, handleColorChange, handleMouse } =
    useSetActiveProduct()

  return (
    <div id={id} className={cn("flex flex-col w-full", className)}>
      {/* Afbeeldingen stack */}
      <div className={cn("relative w-full", aspectClass)}>
        <ProductCardImages
          productImages={images}
          activeColor={activeColor}
          activeImage={activeImage}
          handleMouse={handleMouse}
          className="absolute inset-0"
        />
      </div>

      {/* Thumbnail navigatie */}
      {showThumbs && (
        <ProductThumbs
          productId={id}
          productImages={images}
          activeColor={activeColor}
          setActiveColor={handleColorChange}
        />
      )}
    </div>
  )
}

// Herexport types voor gebruik in parent components
export type { ProductImagesProps }
