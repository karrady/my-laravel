<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question_nl' => 'Hoe ver van tevoren moet ik boeken?',
                'answer_nl'   => 'Wij adviseren minimaal 2 uur van tevoren te boeken. Voor luchthaventritten raden we aan minimaal 24 uur van tevoren te reserveren. Bij spoedritten kunt u bellen — we doen ons best u zo snel mogelijk te helpen.',
                'question_en' => 'How far in advance should I book?',
                'answer_en'   => 'We recommend booking at least 2 hours in advance. For airport transfers, we recommend booking at least 24 hours ahead. For urgent rides, please call us.',
                'category'    => 'boeken',
                'sort_order'  => 1,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Hoe betaal ik voor mijn rit?',
                'answer_nl'   => 'U betaalt achteraf in de taxi, contant of met pin. Wij werken niet met online betalingen vooraf. Na afloop ontvangt u een digitale factuur via e-mail.',
                'question_en' => 'How do I pay for my ride?',
                'answer_en'   => 'You pay afterwards in the taxi, by cash or card. We do not process online payments in advance. You will receive a digital invoice by email afterwards.',
                'category'    => 'betalen',
                'sort_order'  => 2,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Zijn de prijzen inclusief btw?',
                'answer_nl'   => 'Ja, alle getoonde prijzen zijn inclusief 21% btw. Er zijn geen verborgen kosten. De vaste prijs die u ziet bij het boeken is de prijs die u betaalt.',
                'question_en' => 'Are prices including VAT?',
                'answer_en'   => 'Yes, all shown prices are including 21% VAT. There are no hidden costs. The fixed price shown at booking is what you pay.',
                'category'    => 'betalen',
                'sort_order'  => 3,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Rijden jullie ook \'s nachts en in het weekend?',
                'answer_nl'   => 'Ja, YAS TaxiCentrale rijdt 7 dagen per week, 24 uur per dag. Ook op feestdagen zijn wij beschikbaar. Voor vroege ochtendritten (vóór 6:00) of late nachtritten (na 23:00) kan een nachttoeslag van toepassing zijn.',
                'question_en' => 'Do you drive at night and on weekends?',
                'answer_en'   => 'Yes, YAS TaxiCentrale operates 7 days a week, 24 hours a day. We are also available on public holidays. A night surcharge may apply for very early morning or late night trips.',
                'category'    => 'diensten',
                'sort_order'  => 4,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Kunnen jullie naar alle luchthavens rijden?',
                'answer_nl'   => 'Wij rijden naar alle grote Nederlandse luchthavens: Amsterdam Schiphol, Rotterdam The Hague Airport, Eindhoven Airport en Rotterdam. Voor internationale bestemmingen (Brussel, Parijs CDG) neem contact met ons op voor een offerte.',
                'question_en' => 'Can you drive to all airports?',
                'answer_en'   => 'We drive to all major Dutch airports: Amsterdam Schiphol, Rotterdam The Hague Airport, and Eindhoven Airport. For international destinations, please contact us for a quote.',
                'category'    => 'diensten',
                'sort_order'  => 5,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Wat als mijn vlucht vertraging heeft?',
                'answer_nl'   => 'Wij volgen uw vlucht via het vluchtnummer dat u opgeeft bij het boeken. Bij vertraging passen wij automatisch de ophaaltijd aan. U betaalt nooit extra voor wachttijd door vliegvertragingen.',
                'question_en' => 'What if my flight is delayed?',
                'answer_en'   => 'We track your flight using the flight number you provide at booking. In case of delay, we automatically adjust the pickup time. You never pay extra for waiting time due to flight delays.',
                'category'    => 'luchthaven',
                'sort_order'  => 6,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Hoeveel bagage mag ik meenemen?',
                'answer_nl'   => 'In onze sedan en business class kunt u 2 grote koffers en 2 handbagage meenemen. De taxibus heeft ruimte voor 6–8 grote koffers. Heeft u meer bagage? Neem dan contact op om de mogelijkheden te bespreken.',
                'question_en' => 'How much luggage can I bring?',
                'answer_en'   => 'Our sedan and business class can accommodate 2 large suitcases and 2 carry-ons. The taxi bus has room for 6–8 large suitcases. For more luggage, please contact us.',
                'category'    => 'diensten',
                'sort_order'  => 7,
                'is_visible'  => true,
            ],
            [
                'question_nl' => 'Kan ik een rit annuleren?',
                'answer_nl'   => 'U kunt een rit kosteloos annuleren tot 2 uur voor de geplande ophaalttijd. Bij annulering binnen 2 uur kunnen annuleringskosten in rekening worden gebracht. Neem altijd contact op via telefoon bij een annulering.',
                'question_en' => 'Can I cancel a ride?',
                'answer_en'   => 'You can cancel a ride free of charge up to 2 hours before the scheduled pickup time. Cancellations within 2 hours may incur cancellation fees. Always contact us by phone to cancel.',
                'category'    => 'boeken',
                'sort_order'  => 8,
                'is_visible'  => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
