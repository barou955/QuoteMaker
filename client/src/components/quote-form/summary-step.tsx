import React from 'react';
import { Building, List, User, Microscope, Puzzle, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactInfo, Cytometer, TrainingModule, AdditionalOption } from '@/types/quote';
import type { QuoteCalculationResult } from '@/lib/quote-calculator';
import { contactInfoSchema } from '@shared/schema';
import { formatPrice, calculateQuoteWithDiscounts, validatePromoCode, generateAutomaticComments } from '@/lib/quote-calculator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

interface SummaryStepProps {
  institutionType: 'public' | 'private';
  countryLanguage: 'FR' | 'BNL';
  numberOfParticipants: number;
  selectedCytometers: Cytometer[];
  selectedModules: TrainingModule[];
  selectedOptions: AdditionalOption[];
  totalPrice: number;
  contactInfo: ContactInfo;
  automaticComments: string;
  onContactInfoChange: (contactInfo: ContactInfo) => void;
  promoCode: string;
  onPromoCodeChange: (promoCode: string) => void;
}

export function SummaryStep({
  institutionType,
  countryLanguage,
  numberOfParticipants,
  selectedCytometers,
  selectedModules,
  selectedOptions,
  totalPrice,
  contactInfo,
  automaticComments,
  onContactInfoChange,
  promoCode,
  onPromoCodeChange,
}: SummaryStepProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: contactInfo,
  });

  const isPublic = institutionType === 'public';
  const institutionTypeText = isPublic ? t.quote.institutionType.public : t.quote.institutionType.private;
  const pricingText = isPublic ? t.quote.institutionType.publicPricing : t.quote.institutionType.privatePricing;

  // Calcul des réductions détaillées
  const calculation: QuoteCalculationResult = calculateQuoteWithDiscounts(institutionType, numberOfParticipants, selectedCytometers, selectedModules, selectedOptions, promoCode);

  // Recalculer les commentaires automatiques avec la langue de l'interface
  const localizedComments = React.useMemo(() => {
    return generateAutomaticComments(
      countryLanguage,
      institutionType,
      numberOfParticipants,
      selectedCytometers,
      selectedModules,
      selectedOptions,
      calculation.discounts,
      language
    );
  }, [countryLanguage, institutionType, numberOfParticipants, selectedCytometers, selectedModules, selectedOptions, calculation.discounts, language]);

  const hasDiscounts = calculation.discounts.totalDiscount > 0;

  const handleFormChange = (data: ContactInfo) => {
    onContactInfoChange(data);
  };

  // Mettre à jour les données en temps réel
  const watchedValues = form.watch();
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && value) {
        onContactInfoChange(value as ContactInfo);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onContactInfoChange]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'cytometer':
        return <Microscope className="w-4 h-4 text-primary" />;
      case 'module':
        return <Puzzle className="w-4 h-4 text-primary" />;
      case 'option':
        return <Plus className="w-4 h-4 text-primary" />;
      default:
        return <List className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="bg-muted/30 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t.quote.summary.title}</h2>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Institution Info */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="font-semibold mb-4 flex items-center">
            <Building className="w-5 h-5 text-primary mr-2" />
            {t.quote.summary.institutionInfo}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.quote.summary.institutionTypeLabel}</span>
              <span className="font-medium" data-testid="text-institution-type">{institutionTypeText}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.quote.summary.pricingLabel}</span>
              <span className="font-medium" data-testid="text-pricing-type">{pricingText}</span>
            </div>
          </div>
        </div>

        {/* Selected Items */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="font-semibold mb-4 flex items-center">
            <List className="w-5 h-5 text-primary mr-2" />
            {t.quote.summary.selectedItems}
          </h3>
          <div className="space-y-3" data-testid="summary-items">
            {selectedCytometers.map((cytometer) => {
              const price = isPublic ? cytometer.pricePublic : cytometer.pricePrivate;
              return (
                <div key={cytometer.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getItemIcon('cytometer')}
                    <span className="ml-3">{cytometer.name}</span>
                  </div>
                  <span className="font-medium">{formatPrice(price)}</span>
                </div>
              );
            })}

            {selectedModules.map((module) => {
              const price = isPublic ? module.pricePublic : module.pricePrivate;
              return (
                <div key={module.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getItemIcon('module')}
                    <span className="ml-3">{module.name}</span>
                  </div>
                  <span className="font-medium">{formatPrice(price)}</span>
                </div>
              );
            })}

            {selectedOptions.map((option) => {
              const price = isPublic ? option.pricePublic : option.pricePrivate;
              return (
                <div key={option.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getItemIcon('option')}
                    <span className="ml-3">{option.name}</span>
                  </div>
                  <span className="font-medium">{formatPrice(price)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 text-primary mr-2" />
            {t.quote.summary.contactInfo}
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormChange)} className="space-y-4">
              {/* Civilité */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.quote.summary.titleLabel} *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const currentValues = form.getValues();
                        onContactInfoChange({ ...currentValues, title: value as 'Madame' | 'Monsieur' });
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-title">
                          <SelectValue placeholder={t.quote.summary.titlePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Madame">{t.quote.summary.madame}</SelectItem>
                        <SelectItem value="Monsieur">{t.quote.summary.monsieur}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.quote.summary.nameLabel} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.quote.summary.namePlaceholder}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const currentValues = form.getValues();
                            onContactInfoChange({ ...currentValues, name: e.target.value });
                          }}
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.quote.summary.emailLabel} *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t.quote.summary.emailPlaceholder}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const currentValues = form.getValues();
                            onContactInfoChange({ ...currentValues, email: e.target.value });
                          }}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.quote.summary.institutionLabel} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.quote.summary.institutionPlaceholder}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const currentValues = form.getValues();
                            onContactInfoChange({ ...currentValues, institution: e.target.value });
                          }}
                          data-testid="input-institution"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.quote.summary.phoneLabel}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t.quote.summary.phonePlaceholder}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const currentValues = form.getValues();
                            onContactInfoChange({ ...currentValues, phone: e.target.value });
                          }}
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Adresse complète */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.quote.summary.addressLabel} *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.quote.summary.addressPlaceholder}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const currentValues = form.getValues();
                          onContactInfoChange({ ...currentValues, address: e.target.value });
                        }}
                        data-testid="textarea-address"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Pricing Details */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-semibold mb-4">{t.quote.summary.pricingDetails}</h3>

          {/* Participants Info */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>{t.quote.summary.participantsCount}</span>
              <span className="font-medium" data-testid="text-participants-count">{numberOfParticipants} {numberOfParticipants > 1 ? t.quote.summary.persons : t.quote.summary.person}</span>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between py-2 border-b">
            <span>{t.quote.summary.subtotal}</span>
            <span className="font-medium" data-testid="text-subtotal">{formatPrice(calculation.subtotal)}</span>
          </div>

          {/* Promo Code Section */}
          <div className="bg-card border rounded-lg p-4 mt-4">
            <Label htmlFor="promoCode" className="text-sm font-medium mb-2 block">
              {t.quote.summary.promoCode}
            </Label>
            <div className="flex gap-2">
              <Input
                id="promoCode"
                type="text"
                placeholder={t.quote.summary.promoCodePlaceholder}
                value={promoCode}
                onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
                className="flex-1"
              />
              {promoCode && validatePromoCode(promoCode) > 0 && (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  ✓ -{Math.round(validatePromoCode(promoCode) * 100)}%
                </div>
              )}
              {promoCode && validatePromoCode(promoCode) === 0 && (
                <div className="flex items-center text-red-600 text-sm font-medium">
                  {t.quote.summary.promoCodeInvalid}
                </div>
              )}
            </div>
          </div>

          {/* Discounts Section */}
          {hasDiscounts && (
            <div className="py-3 space-y-2 border-b mt-4">
              <div className="text-sm font-medium text-green-700 mb-2">{t.quote.summary.discountsApplied}</div>

              {calculation.discounts.institutionDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">
                    {t.quote.summary.institutionDiscount}
                  </span>
                  <span className="text-green-600 font-medium" data-testid="text-discount-institution">
                    -{formatPrice(calculation.discounts.institutionDiscount)}
                  </span>
                </div>
              )}

              {calculation.discounts.durationDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">
                    {t.quote.summary.promoDiscount.replace('{{percent}}', Math.round(validatePromoCode(promoCode) * 100).toString())}
                  </span>
                  <span className="text-green-600 font-medium" data-testid="text-discount-promo">
                    -{formatPrice(calculation.discounts.durationDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-medium pt-2 border-t border-green-200">
                <span className="text-green-700">{t.quote.summary.totalDiscounts}</span>
                <span className="text-green-700" data-testid="text-discount-total">
                  -{formatPrice(calculation.discounts.totalDiscount)}
                </span>
              </div>
            </div>
          )}

          {!hasDiscounts && (
            <div className="py-2 text-sm text-muted-foreground border-b">
              {t.quote.summary.noDiscounts}
            </div>
          )}
        </div>

        {/* Commentaires automatiques */}
        {localizedComments && (
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">{t.quote.summary.automaticComments}</h3>
            <div className="text-sm text-muted-foreground leading-relaxed" data-testid="text-automatic-comments">
              {localizedComments}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between text-2xl font-bold">
            <span>{t.quote.summary.total}</span>
            <span className="text-primary" data-testid="text-total-price">{formatPrice(calculation.total)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t.quote.summary.totalIncluding}
            {hasDiscounts && (
              <span className="block text-green-600 font-medium mt-1">
                {t.quote.summary.savings.replace('{{amount}}', formatPrice(calculation.discounts.totalDiscount))}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}