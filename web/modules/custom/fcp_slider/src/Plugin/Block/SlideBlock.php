<?php

namespace Drupal\fcp_slider\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\Core\Entity\EntityManager;
use Drupal\Core\Entity\EntityInterface;
use Drupal\group\Entity\GroupInterface;

/**
 * Provides an example block.
 *
 * @Block(
 *   id = "fcp_slider",
 *   admin_label = @Translation("SlideBlock"),
 *   category = @Translation("Custom")
 * )
 */

class SlideBlock extends BlockBase {
  public function build() {
  
    $data = null;

  /**
   * Содержимое блока 
   * */   
    $block = [
      '#theme' => 'fcp_slider',
      '#data' => $data,
    ];
    return $block;
  }
}
