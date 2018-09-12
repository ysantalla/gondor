import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
  stagger,
  state
} from '@angular/animations';

export const ANIMATE_ON_ROUTE_ENTER = 'route-enter-staggered';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
      optional: true
    }),
    query(':enter .' + ANIMATE_ON_ROUTE_ENTER, style({ opacity: 0 }), {
      optional: true
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(-2%)', opacity: 0 }),
          animate(
            '0.5s 0.5s ease-in-out',
            style({ transform: 'translateY(0%)', opacity: 1 })
          )
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate(
            '0.2s ease-in-out',
            style({ transform: 'translateY(-2%)', opacity: 0 })
          )
        ],
        { optional: true }
      )
    ]),
    query(
      ':enter .' + ANIMATE_ON_ROUTE_ENTER,
      stagger(200, [
        style({ transform: 'translateY(5%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ]),
      { optional: true }
    )
  ])
]);

